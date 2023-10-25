const passport = require("passport");
const Industry = require("../modals/industry");
const Academia = require("../modals/academia");

require("dotenv").config();
const jwtSecretKey = process.env.JWT_SECRET_KEY;
var JwtStrategy = require("passport-jwt").Strategy,
  ExtractJwt = require("passport-jwt").ExtractJwt;
var opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = jwtSecretKey;

// const Remover = require("./functions/deleteImages");

passport.use(
  new JwtStrategy(opts, function (jwt_payload, done) {
    const type = jwt_payload.type;
    const ModalToFind = type === "academia" ? Academia : Industry;
    console.log(jwt_payload);
    ModalToFind.findOne({ _id: jwt_payload.username }, function (err, user) {
      if (err) {
        console.log("error1", err);

        return done(err, false);
      }
      if (user) {
        console.log(user);
        req.user = user;
        return done(null, user);
      } else {
        console.log("error", err);
        return done(null, false);
        // or you could create a new account
      }
    });
  })
);
