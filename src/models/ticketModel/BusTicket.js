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
  price: Number,
});

const userSchema = new mongoose.Schema({
  name: String,
  age: String,
  gender: String,
  email: String,
  mobile: String,
});

const busTicketSchema = new mongoose.Schema(
  {
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
    busdetails: [busSchema],
    userDetails: [userSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model("busTickets", busTicketSchema);
