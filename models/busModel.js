const mongoose = require("mongoose");

// const departure = new mongoose.Schema({
//   station: String,
//   city: String,
//   district: String,
//   state: String,
//   country: String,
//   departureDate: String,
//   departureTime: String,
// });

const stations = new mongoose.Schema({
  station: String,
  city: String,
  district: String,
  state: String,
  arrivaltime: String,
  departureTime: String,
});

const bookedseats = new mongoose.Schema({
  seatnumber: Number,
  gender: String,
  name: String,
});

const seatdetails = new mongoose.Schema({
  totalseats: Number,
  seatformation: String,
});

const busSchema = new mongoose.Schema({
  busname: String,
  busnumber: String,
  bustype: String,
  category: String,
  // departure: [departure],
  stations: [stations],
  // seats: Number,
  seatdetails: [seatdetails],
  bookedseats: [bookedseats],
  // departureDateTime: String,
  // arrivalDateTime: String,
  // price: Number,
});

module.exports = mongoose.model("busdata", busSchema);
