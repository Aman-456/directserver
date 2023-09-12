const express = require("express");

const userController = require("../controllers/user");
const router = express.Router();

router.post("/signup", userController.signUP);
router.get("/verify", userController.Verify);
router.post("/signin", userController.signIn);
router.post("/otpsend", userController.OTP);
router.post("/verifyotp", userController.verifyOTP);
router.post("/changepassword", userController.changePassword);

exports.routes = router;
