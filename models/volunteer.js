const mongoose = require("mongoose");

//Volunteer Schema
const volunteerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      min: 2,
    },
    email: {
      type: String,
      required: true,
    },
    about: {
      type: String,
      required: true,
      max: 300,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    author: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    toJSON: {
      transform(_, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);

module.exports = mongoose.model("Volunteer", volunteerSchema);
