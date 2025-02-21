const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  age: String,
  gender: String,
  email: String,
  mobile: String,
});

const trainTicktSchema = new mongoose.Schema({
  userDetails: [userSchema],
});

module.exports = mongoose.model("traintickets", trainTicktSchema);
