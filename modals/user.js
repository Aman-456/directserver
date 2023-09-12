const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");

const UserSchema = new Schema(
  {
    id: Schema.ObjectId,
    email: { type: String, trim: true },
    firstName: { type: String, trim: true },
    phone: { type: String, trim: true },
    lastName: { type: String, trim: true },
    password: { type: String },
    verify: { type: Boolean, default: false },
    otp: { type: String },
    expireTime: { type: Date },
    profileComplete: false,
  },
  { timestamps: true }
);

UserSchema.statics.CreateHash = async (password) => {
  return await bcrypt.hashSync(password, 10);
};

UserSchema.statics.isPasswordEqual = async (password, passwordFromDatabase) => {
  return bcrypt.compare(password, passwordFromDatabase);
};

module.exports = mongoose.model("user", UserSchema);
