const mongoose = require("mongoose");

const origin = new mongoose.Schema({
  Code: String,
  name: String,
  city: String,
  country: String,
  departureDate: String,
  departureTime: String,
});

const destination = new mongoose.Schema({
  Code: String,
  name: String,
  city: String,
  country: String,
  arrivalDate: String,
  arrivalTime: String,
});

const prices = new mongoose.Schema({
  ecconomy: Number,
  premiumEcconomy: Number,
  bussiness: Number,
  firstclass: Number,
});

const seats = new mongoose.Schema({
  ecconomy: Number,
  premiumEcconomy: Number,
  bussiness: Number,
  firstclass: Number,
});

const flightSchema = new mongoose.Schema({
  airline: String,
  airlineimagecode: String,
  flightNumber: { type: String, required: true },
  airport: [origin],
  destination: [destination],
  departureDateTime: String,
  arrivalDateTime: String,
  duration: Number,
  aircraft: String,
  travelclass: [{ type: String, required: true }],
  prices: [prices],
  taxes: Number,
  seats: [seats],
});

module.exports = mongoose.model("flightdata", flightSchema);
