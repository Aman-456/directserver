const express = require("express");

const IndustryController = require("../controllers/industry");
const userProfileMulter = require("../middlewares/userProfile");
const router = express.Router();

router.post("/signup", IndustryController.signUP);
router.get("/verify", IndustryController.Verify);
router.post("/signin", IndustryController.signIn);
router.post("/getmyprofile", IndustryController.getmyprofile);
router.post("/otpsend", IndustryController.OTP);
router.post("/verifyotp", IndustryController.verifyOTP);
router.post("/changepassword", IndustryController.changePassword);
router.post(
  "/updateprofile",
  userProfileMulter.upload.single("image"),
  IndustryController.UpdateUSer
);

exports.routes = router;
