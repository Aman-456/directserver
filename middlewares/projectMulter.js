const multer = require("multer");
const fs = require("fs");
const base = "asset/projects";
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (!file) return;

    const destination = base + "/" + req.body.title;
    if (!fs.existsSync(destination)) {
      fs.mkdirSync(destination, { recursive: true });
    }

    cb(null, destination);
  },
  filename: function (req, file, cb) {
    if (!file) return;

    if (file) {
      const mimetype = file.mimetype;
      const extension = mimetype.slice(
        mimetype.indexOf("/") + 1,
        mimetype.length
      );
      var filename = "profile" + "." + extension;
      const destination = base + "/" + req.body.title;

      req.body.image = destination + "/" + filename;
      cb(null, filename);
    }
  },
});

exports.upload = multer({ storage: storage });
