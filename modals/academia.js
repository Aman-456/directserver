const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");

const AcademiaSchema = new Schema(
  {
    email: { type: String, trim: true, required: true },
    firstName: { type: String, trim: true, required: true },
    phone: { type: String, trim: true, required: true },
    lastName: { type: String, trim: true, required: true },
    password: { type: String },
    verify: { type: Boolean, default: false },
    // focusArea: { type: String, required: true },
    otp: { type: String },
    expireTime: { type: Date },
    type: { type: String, required: true },
    profileComplete: false,
  },
  { timestamps: true }
);

AcademiaSchema.statics.CreateHash = async (password) => {
  return await bcrypt.hashSync(password, 10);
};

AcademiaSchema.statics.isPasswordEqual = async (
  password,
  passwordFromDatabase
) => {
  return bcrypt.compare(password, passwordFromDatabase);
};

module.exports = mongoose.model("academia", AcademiaSchema);
