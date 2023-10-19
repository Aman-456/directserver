const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");

const AdminSchema = new Schema(
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

const temporarycodeOTP = new Schema();

AdminSchema.statics.CreateHash = async (password) => {
  return await bcrypt.hashSync(password, 10);
};

AdminSchema.statics.isPasswordEqual = async (
  password,
  passwordFromDatabase
) => {
  return bcrypt.compare(password, passwordFromDatabase);
};

module.exports = mongoose.model("admin", AdminSchema);
