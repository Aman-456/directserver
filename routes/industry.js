const express = require("express");

const IndustryController = require("../controllers/industry");
const router = express.Router();

router.post("/signup", IndustryController.signUP);
router.get("/verify", IndustryController.Verify);
router.post("/signin", IndustryController.signIn);
router.post("/otpsend", IndustryController.OTP);
router.post("/verifyotp", IndustryController.verifyOTP);
router.post("/changepassword", IndustryController.changePassword);

exports.routes = router;