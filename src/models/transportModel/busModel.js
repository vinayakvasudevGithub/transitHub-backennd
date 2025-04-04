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

const prices = new mongoose.Schema({
  minimumfare: Number,
  perkilometre: Number,
});

const busSchema = new mongoose.Schema({
  user: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "adminpanel",
      required: true,
    },
    transithubUser: {
      type: String,
    },
  },
  busname: String,
  busnumber: String,
  bustype: String,
  AC: String,
  stations: [stations],
  seatdetails: [seatdetails],
  ticketprices: [prices],
});

module.exports = mongoose.model("busdata", busSchema);
