const express = require("express");

const projectController = require("../controllers/projects");
const router = express.Router();
const projectMulter = require("../middlewares/projectMulter");
router.post(
  "/addproject",

  projectMulter.upload.single("image"),

  projectController.addproject
);
router.get("/getprojects", projectController.getprojects);
router.get("/getproject", projectController.getproject);

exports.routes = router;
