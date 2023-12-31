const User = require("../modals/user");
const { SendEmail } = require("../common/email");
const path = require("path");
const JWT = require("jsonwebtoken");
const { sendOTP } = require("../common/email");
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

exports.signUP = async (req, res) => {
  try {
    console.log(req.body);
    const user = new User(req.body);
    user.email = req.body.email.toLowerCase();

    user.password = await User.CreateHash(user.password);
    const oldUser = await User.findOne({
      $or: [{ email: user.email.toLowerCase() }, { phone: user.phone }],
    });
    if (oldUser) {
      res.status(400).json({
        type: "emailExist",
        result: "User already Exist. Choose a Different email and phone number",
      });
      return;
    }

    SendEmail(user.email, user.firstname, user, res);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ type: "failure", result: "Server not Responding. Try Again" });
  }
};

exports.Verify = async (req, res) => {
  try {
    const Id = req.query.token;

    var user = await User.findOne({ _id: Id });

    user.verify = true;
    user
      .save()
      .then(() => {
        res.sendFile(
          path.join(__dirname + "../../templates/emailverified.html")
        );
      })
      .catch((error) => {
        res
          .status(500)
          .json({ type: "failure", result: "Server Not Responding" });
        return;
      });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ type: "failure", result: "Server not Responding. Try Again" });
  }
};

exports.signIn = async (req, res) => {
  try {
    console.log(req.body);

    var user = await User.findOne({
      $or: [{ email: req.body.email.toLowerCase() }, { phone: req.body.email }],
    });

    if (!user) {
      res.status(401).json({
        type: "failure",
        result: "No User Exists With Such Email or Phone",
      });
    } else {
      if (user.verify === false) {
        return res
          .status(401)
          .json({ type: "failureEmail", result: "Email is not verified" });
      }
      const isEqual = await User.isPasswordEqual(
        req.body.password,
        user.password
      );

      if (isEqual) {
        const token = JWT.sign({ username: user._id }, JWT_SECRET_KEY);
        res.status(200).json({
          type: "success",
          result: "User Login Successfully",
          token: token,
          userDetails: {
            id: user._id,
            email: user.email,
            firstname: user.firstName,
            lastname: user.lastName,
            phone: user.phone,
            role: user.primaryRole,
          },
        });
      } else {
        res.status(401).json({ type: "failure", result: "Wrong Password" });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ type: "failure", result: "Server Not Responding" });
  }
};

exports.OTP = async (req, res) => {
  console.log("object" + req.body.email);
  try {
    var user = await User.findOne({ email: req.body.email.toLowerCase() });
    if (user) {
      sendOTP(user.email, user.firstname, user, res);
    } else {
      res.status(401).json({ type: "failure", result: "Email Does not Exist" });
    }
  } catch (error) {
    console.log(error + "error");
    res.status(500).json({ type: "failure", result: "Server Not Responding" });
  }
};

exports.verifyOTP = async (req, res) => {
  try {
    var otp = req.body.number;
    const data = await User.findOne({ email: req.body.email.toLowerCase() });

    const now = new Date();
    if (now > new Date(data.expireTime)) {
      res.status(401).json({ type: "failure", result: "OTP has been expired" });
    } else {
      if (otp === data.otp) {
        res
          .status(200)
          .json({ type: "success", result: "OTP has been verified" });
      } else {
        res.status(401).json({ type: "failure", result: "OTP is incorrect" });
      }
    }
  } catch (error) {
    console.log(error + "error");
    res.status(500).json({ type: "failure", result: "Server Not Responding" });
  }
};

exports.changePassword = async (req, res) => {
  try {
    console.log("OTP" + req.body.email + req.body.password);

    const user = await User.findOne({ email: req.body.email.toLowerCase() });
    user.password = await User.CreateHash(req.body.password);
    user
      .save()
      .then(() => {
        res.status(200).json({
          type: "success",
          result: "Password has been changed",
        });
      })
      .catch((error) => {
        res
          .status(500)
          .json({ type: "failure", result: "Server Not Responding" });
        return;
      });
  } catch (error) {
    res.status(500).json({ type: "failure", result: "Server Not Responding" });
  }
};
