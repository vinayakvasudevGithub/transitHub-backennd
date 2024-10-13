const mongoose = require("mongoose");

const stations = new mongoose.Schema({
  station: String,
  city: String,
  district: String,
  state: String,
  arrivaltime: String,
  departureTime: String,
});

const trainSchema = new mongoose.Schema({
  trainname: String,
  trainnumber: String,
  category: String,
  stations: [stations],
  seats: Number,
  departureDateTime: String,
  arrivalDateTime: String,
});

module.exports = mongoose.model("traindata", trainSchema);
