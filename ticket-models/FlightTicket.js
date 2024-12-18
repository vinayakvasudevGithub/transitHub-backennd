const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  age: Number,
  gender: String,
  email: String,
  mobile: Number,
});

const flightTicketSchema = new mongoose.Schema({
  airlineTicketId: String,
  userDetails: [userSchema],
});

module.exports = mongoose.model("flightTickets", flightTicketSchema);
