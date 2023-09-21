const projects = require("../modals/projects");

exports.addproject = async (req, res) => {
  try {
    console.log(req.body);
    const project = new projects(req.body);
    await project.save();
    if (project) {
      res.status(200).json({ type: "success", result: project });
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ type: "failure", result: "Server not Responding. Try Again" });
  }
};

exports.getprojects = async (req, res) => {
  try {
    console.log(req.body);
    const project = await projects.find({});
    if (project) {
      res.status(200).json({ type: "success", result: project });
    }
  } catch (error) {
    res.status(500).json({ type: "failure", result: "Server Not Responding" });
  }
};

exports.getproject = async (req, res) => {
  try {
    const { id } = req.query;
    const project = await projects.findOne({ _id: id });
    if (project) {
      res.status(200).json({ type: "success", result: project });
    }
  } catch (error) {
    res.status(500).json({ type: "failure", result: "Server Not Responding" });
  }
};
