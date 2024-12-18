const mongoose = require("mongoose");

const stations = new mongoose.Schema({
  station: String,
  city: String,
  district: String,
  state: String,
  arrivaltime: String,
  departureTime: String,
});

const seatdetails = new mongoose.Schema({
  totalseats: Number,
  seatformation: String,
  seats: [],
});

const busSchema = new mongoose.Schema({
  busname: String,
  busnumber: String,
  bustype: String,
  stations: [stations],
  seatdetails: [seatdetails],
});

module.exports = mongoose.model("busdata", busSchema);
