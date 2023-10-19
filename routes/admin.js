const express = require("express");

const adminController = require("../controllers/admin");
const router = express.Router();

router.post("/signup", adminController.signUP);
router.get("/verify", adminController.Verify);
router.post("/signin", adminController.signIn);
router.post("/verifytempOTP", adminController.verifyTempOTP);
router.post("/otpsend", adminController.OTP);
router.post("/verifyotp", adminController.verifyOTP);
router.post("/changepassword", adminController.changePassword);

exports.routes = router;
