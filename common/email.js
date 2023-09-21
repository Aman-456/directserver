require("dotenv").config();
const nodemailer = require("nodemailer");
var handlebars = require("handlebars");

var fs = require("fs");
var readHTMLFile = function (path, callback) {
  fs.readFile(path, { encoding: "utf-8" }, function (err, html) {
    if (err) {
      callback(err);
      throw err;
    } else {
      callback(null, html);
    }
  });
};
exports.SendEmail = async (email, name, user, res, modaltype) => {
  try {
    const transporter = await nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: `${process.env.EMAIL_ADDRESS}`,
        pass: `${process.env.EMAIL_PASSWORD}`,
      },
    });
    const URL = `http://${process.env.HOST}:${process.env.PORT}/${modaltype}/verify?token=${user._id}`;

    readHTMLFile(
      "./templates/emailverification.html",
      async function (err, html) {
        var template = handlebars.compile(html);
        var replacements = {
          name: user.firstname + " " + user.lastname,
          link: URL,
        };
        var htmlToSend = template(replacements);

        const mailOptions = {
          from: `${process.env.EMAIL_ADDRESS}`,
          to: email,
          subject: "Please confirm account",
          html: htmlToSend,
        };

        await transporter.verify();

        //Send Email
        await transporter.sendMail(mailOptions, (err, response) => {
          console.log(response);
          if (err) {
            res
              .status(500)
              .json({ type: "failure", result: "Server Not Responding" });
            return;
          } else {
            user.save(async (err, data) => {
              if (err) {
                return res
                  .status(500)
                  .json({ type: "failure", result: "Server Not Responding" });
              } else {
                res.status(200).json({
                  type: "success",
                  result: "User Registered Successfully",
                });
              }
            });
          }
        });
      }
    );
  } catch (error) {
    console.log(error + "error");
  }
};

exports.sendOTP = async (email, name, user, res) => {
  try {
    var otp = Math.floor(1000 + Math.random() * 9000);

    const now = new Date();
    const expiration_time = new Date(now.getTime() + 10 * 60000);

    user.otp = otp;
    user.expireTime = expiration_time;
    user.save(async (err, data) => {
      if (err) {
        return res
          .status(500)
          .json({ type: "failure", result: "Server Not Responding" });
      } else {
        const transporter = nodemailer.createTransport({
          host: "smtp.gmail.com",
          port: 465,
          secure: true,
          auth: {
            user: `${process.env.EMAIL_ADDRESS}`,
            pass: `${process.env.EMAIL_PASSWORD}`,
          },
        });

        readHTMLFile("./templates/sendOTP.html", async function (err, html) {
          var template = handlebars.compile(html);
          var replacements = {
            name: user.firstname + " " + user.lastname,
            otp: otp,
          };
          var htmlToSend = template(replacements);

          const mailOptions = {
            from: `${process.env.EMAIL_ADDRESS}`,
            to: `${email}`,
            subject: "OTP: For Change Password",
            html: htmlToSend,
          };

          await transporter.verify();

          transporter.sendMail(mailOptions, (err, response) => {
            console.log(response);
            console.log(err);

            if (err) {
              return res
                .status(500)
                .json({ type: "failure", result: "Server Not Responding" });
            } else {
              res.status(200).json({
                type: "success",
                result: "OTP has been sent",
              });
            }
          });
        });
      }
    });
  } catch (error) {
    console.log(error + "error");
  }
};

exports.sendTemporaryCodeOTP = async (user, res) => {
  try {
    var otp = Math.floor(1000 + Math.random() * 9000);

    const now = new Date();
    const expiration_time = new Date(now.getTime() + 1 * 60000);

    const obj = {
      code: otp,
      expireTime: expiration_time,
      attempts: 0,
    };
    user.temporarycodeOTP = obj;
    user.save(async (err, data) => {
      if (err) {
        return res
          .status(500)
          .json({ type: "failure", result: "Server Not Responding" });
      } else {
        const transporter = nodemailer.createTransport({
          host: "smtp.gmail.com",
          port: 465,
          secure: true,
          auth: {
            user: `${process.env.EMAIL_ADDRESS}`,
            pass: `${process.env.EMAIL_PASSWORD}`,
          },
        });

        readHTMLFile(
          "./templates/temporarycodeOTP.html",
          async function (err, html) {
            var template = handlebars.compile(html);
            var replacements = {
              name: user.firstname + " " + user.lastname,
              otp: otp,
            };
            var htmlToSend = template(replacements);

            const mailOptions = {
              from: `${process.env.EMAIL_ADDRESS}`,
              to: `${user.email}`,
              subject: "OTP: Verificattoin",
              html: htmlToSend,
            };

            await transporter.verify();

            transporter.sendMail(mailOptions, (err, response) => {
              console.log(response);
              console.log(err);

              if (err) {
                return res
                  .status(500)
                  .json({ type: "failure", result: "Server Not Responding" });
              } else {
                res.status(200).json({
                  type: "success",
                  result: "OTP has been sent",
                });
              }
            });
          }
        );
      }
    });
  } catch (error) {
    console.log(error + "error");
  }
};
