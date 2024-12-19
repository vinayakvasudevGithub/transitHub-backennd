const mongoose = require("mongoose");

// Schema for travel class details
const travelClassDetails = new mongoose.Schema({
  classType: { type: String, required: true },
  minimumDistance: { type: Number, required: true },
  basicFare: { type: Number, required: true },
});

// Schema for different travel classes

// Schema for stations
const stationSchema = new mongoose.Schema({
  station: { type: String, required: true },
  stationCode: { type: String, required: true },
  city: { type: String, required: true },
  district: { type: String, required: true },
  state: { type: String, required: true },
  arrivalDate: { type: String, required: true },
  arrivalTime: { type: String, required: true },
  departureDate: { type: String, required: true },
  departureTime: { type: String, required: true },
});

// Main schema for train details
const trainSchema = new mongoose.Schema({
  trainName: { type: String, required: true },
  trainNumber: { type: String, required: true, unique: true },
  category: { type: String, required: true },
  stations: [stationSchema], // Embedded array of station details
  classes: [travelClassDetails], // Referencing the class schema
});

module.exports = mongoose.model("TrainData", trainSchema);
