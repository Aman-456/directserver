const projects = require("../modals/projects");

exports.seProjectId = async (req, res, next) => {
  try {
    const length = await projects.countDocuments({});
    req.id = "direct_pr_" + (parseInt(length) + 1);

    next(); // Call the next middleware in the chain
    return;
  } catch (e) {
    console.log(e);
  }
};
