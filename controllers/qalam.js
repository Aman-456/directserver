const { default: axios } = require("axios");

exports.getProfiles = async (req, res) => {
  try {
    const response = await axios.get(
      `https://qalam.nust.edu.pk/odoocms_api?alias=ric_expert_portal_faculty_cards&auth=eda78c8a7d78ca83fcb02ff052179b9b&rows=1000&name=`
    );
    res.json(response.data).status(200);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ type: "failure", result: "Server not Responding. Try Again" });
  }
};

exports.getIndustries = async (req, res) => {
  try {
    const response = await axios.get(
      `https://qalam.nust.edu.pk/odoocms_api?alias=ric_expert_portal_faculty&auth=eda78c8a7d78ca83fcb02ff052179b9b&rows=100&empid=`
    );
    console.log(response);
    res.json(response?.data).status(200);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ type: "failure", result: "Server not Responding. Try Again" });
  }
};
exports.getProjects = async (req, res) => {
  try {
    const response = await axios.get(
      `https://qalam.nust.edu.pk/odoocms_api?alias=ric_expert_portal_project&auth=d05a6d2391a1a4c25e0923034eadfc31&rows=200&pi_copi_cmsid=`
    );
    console.log(response);
    res.json(response?.data).status(200);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ type: "failure", result: "Server not Responding. Try Again" });
  }
};
