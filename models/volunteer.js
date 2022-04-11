const mongoose = require("mongoose");

//Volunteer Schema
const volunteerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  about: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Volunteer", volunteerSchema);
