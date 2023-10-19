const multer = require("multer");
const fs = require("fs");
const base = "asset/users/";
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (!file) return;

    const destination = base;
    if (!fs.existsSync(destination)) {
      fs.mkdirSync(destination, { recursive: true });
    }

    cb(null, destination);
  },
  filename: function (req, file, cb) {
    if (!file) return;
    if (file) {
      var filename =
        new Date().getMilliseconds() + "profile" + file.originalname;

      req.body.image = base + filename;
      cb(null, filename);
    }
  },
});

exports.upload = multer({ storage: storage });
