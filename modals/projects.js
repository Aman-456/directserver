const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ProjectsSchema = new Schema(
  {
    id: { type: String, required: true },
    title: {
      type: String,
      required: true, // Makes the 'title' field required
    },
    abstract: String,
    description: String,
    image: String, // Assuming the 'image' field will store image URLs
    category: String,
    startDate: Date,
    endDate: Date,
    number: String,
    terms: String,
    customise: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("projects", ProjectsSchema);
