const express = require("express");
const app = express();
const cors = require("cors");
const compression = require("compression");

const industry = require("./routes/industry.js");
const academia = require("./routes/academia.js");
const admin = require("./routes/admin.js");
const projects = require("./routes/projects.js");

require("./middlewares/authenticator.js");

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
////Database env file

require("dotenv").config();
require("./db/connect.js");

/////////cors

app.use(cors());
app.use(compression());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
  next();
});
app.use("/assets", express.static("assets"));

//Port and Host
const port = process.env.PORT || 3000;
const host = process.env.HOST;

/////check api execution

app.use(function (req, res, next) {
  console.log("api: " + req.originalUrl);
  next();
});
app.use("/academia", academia.routes);
app.use("/industry", industry.routes);
app.use("/admin", admin.routes);
app.use("/projects", projects.routes);

app.listen(port, () => {
  console.log(`Server listening at http://${host}:${port}`);
});
