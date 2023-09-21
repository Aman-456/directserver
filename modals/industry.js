const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");

const IndustrySchema = new Schema(
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

    companyName: { type: String },
    registrationNo: { type: String },
    registrationDate: { type: String },
    taxId: { type: String },
    image: { type: String },
    businessType: { type: String },
    industryType: { type: String },
    address: { type: String },
    industrySpecialization: { type: String },
    description: { type: String },
    buissnessType: { type: String },
  },
  { timestamps: true }
);

IndustrySchema.statics.CreateHash = async (password) => {
  return await bcrypt.hashSync(password, 10);
};

IndustrySchema.statics.isPasswordEqual = async (
  password,
  passwordFromDatabase
) => {
  return bcrypt.compare(password, passwordFromDatabase);
};

module.exports = mongoose.model("industry", IndustrySchema);
