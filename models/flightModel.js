const mongoose = require("mongoose");

const origin = new mongoose.Schema({
  code: String,
  name: String,
  city: String,
  country: String,
  // departureDate: String,
  // departureTime: String,
});

const destination = new mongoose.Schema({
  code: String,
  name: String,
  city: String,
  country: String,
  // arrivalDate: String,
  // arrivalTime: String,
});

const prices = new mongoose.Schema({
  ecconomy: Number,
  premiumEcconomy: Number,
  bussiness: Number,
  // firstclass: Number,
});

const seats = new mongoose.Schema({
  ecconomy: Number,
  premiumEcconomy: Number,
  bussiness: Number,
  // firstclass: Number,
});

const flightSchema = new mongoose.Schema({
  airline: String,
  airlineimagecode: String,
  flightNumber: String,
  airport: [origin],
  destination: [destination],
  departureDate: String,
  departureDateTime: String,
  arrivalDate: String,
  arrivalDateTime: String,
  duration: Number,
  aircraft: String,
  travelclass: [{ type: String }],
  prices: [prices],
  // taxes: Number,
  seats: [seats],
});

module.exports = mongoose.model("flightdata", flightSchema);
