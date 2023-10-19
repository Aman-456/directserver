const express = require("express");

const academiaController = require("../controllers/academia");
const userProfileMulter = require("../middlewares/userProfile");

const router = express.Router();

router.post("/signup", academiaController.signUP);
router.get("/verify", academiaController.Verify);
router.post("/signin", academiaController.signIn);
router.post("/otpsend", academiaController.OTP);
router.post("/verifyotp", academiaController.verifyOTP);
router.post("/changepassword", academiaController.changePassword);
router.post(
  "/updateprofile",
  userProfileMulter.upload.single("image"),
  academiaController.UpdateUSer
);
exports.routes = router;
