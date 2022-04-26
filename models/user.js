const mongoose = require("mongoose");

//User Schema
const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: [true, "Email is required"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
});

const User = (module.exports = mongoose.model("User", userSchema));
