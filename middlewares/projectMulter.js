const multer = require("multer");
const fs = require("fs");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const destination = "assets/projects/" + req.body.name;
    if (!fs.existsSync(destination)) {
      fs.mkdirSync(destination, { recursive: true });
    }

    cb(null, destination);
    cb(null, destination);
  },
  filename: function (req, file, cb) {
    if (file) {
      var filename = "cover";
      req.body.image = destination + "/" + filename;
      cb(null, filename);
    }
  },
});

exports.upload = multer({ storage: storage });
