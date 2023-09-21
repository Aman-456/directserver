const multer = require("multer");
const fs = require("fs");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const destination = "assets/users/" + req.body.type + "/" + req.body.email;
    if (!fs.existsSync(destination)) {
      fs.mkdirSync(destination, { recursive: true });
    }

    cb(null, destination);
  },
  filename: function (req, file, cb) {
    if (file) {
      var filename = "profile";
      req.body.image = destination + "/" + filename;
      cb(null, filename);
    }
  },
});

exports.upload = multer({ storage: storage });
