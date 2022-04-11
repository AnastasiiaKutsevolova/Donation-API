const mongoose = require("mongoose");

//User Schema
const userSchema = mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
});
