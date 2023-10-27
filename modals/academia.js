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
    description: { type: String },
    telephone: { type: String },
    currentUniversity: { type: String },
    designation: { type: String },
    image: { type: String },
    department: { type: String },

    // arrays
    qualificationSection: { type: Array },
    experienceSection: { type: Array },
    university: { type: Array },
    awardsSection: { type: Array },
    scopusSection: { type: Array },
    socialMediaSection: { type: Array },
    membershipSection: { type: Array },
    researchProjectsSection: { type: Array },
    industrialProjectsSection: { type: Array },
    researchArticlesSection: { type: Array },
    conferenceSection: { type: Array },
    bookChapSection: { type: Array },
    bookSection: { type: Array },
    editorialSection: { type: Array },
    patentsSection: { type: Array },
    copyRightsSection: { type: Array },
    industrialDesignsSection: { type: Array },
    technologyTransferedSection: { type: Array },
    attendedSection: { type: Array },
    organizedSection: { type: Array },
    phdSection: { type: Array },
    mastersSection: { type: Array },
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
