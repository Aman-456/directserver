const express = require("express");

const projectsController = require("../controllers/projects");
const router = express.Router();

router.post("/addproject", projectsController.addproject);
router.get("/getprojects", projectsController.getprojects);
router.get("/getproject", IndustryController.getproject);

exports.routes = router;
