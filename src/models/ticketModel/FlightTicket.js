const mongoose = require("mongoose");

const departureSchema = new mongoose.Schema({
  code: String,
  name: String,
  city: String,
  country: String,
  departureDate: String,
  departureTime: String,
});

const arrivalSchema = new mongoose.Schema({
  code: String,
  name: String,
  city: String,
  country: String,
  arrivalDate: String,
  arrivalTime: String,
});

const flightSchema = new mongoose.Schema({
  departure: [departureSchema],
  arrival: [arrivalSchema],
});

const userSchema = new mongoose.Schema({
  name: String,
  age: Number,
  gender: String,
  email: String,
  mobile: Number,
});

const flightTicketSchema = new mongoose.Schema({
  airlineTicketId: String,
  user: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    transithubUser: {
      type: String,
    },
  },
  flightDetails: [flightSchema],
  userDetails: [userSchema],
  price: String,
});

module.exports = mongoose.model("flightTickets", flightTicketSchema);
