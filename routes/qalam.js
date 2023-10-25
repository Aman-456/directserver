const express = require("express");
const router = express.Router();
const qalamController = require("../controllers/qalam");
const { createProxyMiddleware } = require("http-proxy-middleware");
router.use(
  "/odoocms_api",
  createProxyMiddleware({
    target: "https://qalam.nust.edu.pk",
    changeOrigin: true,
  })
);

router.get("/profiles", qalamController.getProfiles);
router.get("/industries", qalamController.getIndustries);
router.get("/projects", qalamController.getProjects);

exports.routes = router;
