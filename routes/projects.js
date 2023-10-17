const express = require("express");

const projectController = require("../controllers/projects");
const projectMulter = require("../middlewares/projectMulter");
const SetProjectId = require("../controllers/SetProjectId");
const router = express.Router();
router.post(
  "/addproject",
  SetProjectId.seProjectId,
  projectMulter.upload.single("image"),
  projectController.addproject
);
router.get("/getprojects", projectController.getprojects);
router.get("/getproject", projectController.getproject);

exports.routes = router;
