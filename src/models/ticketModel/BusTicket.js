const mongoose = require("mongoose");

const busSchema = new mongoose.Schema({
  departurecity: String,
  arrivalcity: String,
  busname: String,
  busnumber: String,
  busseatnumber: String,
  bustype: String,
  arrivaltime: String,
  departureTime: String,
});

const userSchema = new mongoose.Schema({
  name: String,
  age: String,
  gender: String,
  email: String,
  mobile: String,
});

const busTicketSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  busdetails: [busSchema],
  userDetails: [userSchema],
});

module.exports = mongoose.model("busTickets", busTicketSchema);
