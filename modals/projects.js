const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");

const ProjectsSchema = new Schema(
  {
    email: { type: String, trim: true, required: true },
    firstName: { type: String, trim: true, required: true },
    phone: { type: String, trim: true, required: true },
    lastName: { type: String, trim: true, required: true },
    password: { type: String },
    verify: { type: Boolean, default: false },
    otp: { type: String },
    temporarycodeOTP: {
      code: { type: String },
      expireTime: { type: Date },
      attempts: { type: Number },
    },
    expireTime: { type: Date },
    type: { type: String, required: true },
    profileComplete: false,
  },
  { timestamps: true }
);

module.exports = mongoose.model("projects", ProjectsSchema);
