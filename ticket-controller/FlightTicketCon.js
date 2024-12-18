const flightTicket = require("../ticket-models/FlightTicket");
const asyncHandler = require("express-async-handler");

const getFlight = asyncHandler(async (req, res) => {
  const ticket = await flightTicket.find();
  res.json(ticket);
});

const createFlightTicket = asyncHandler(async (req, res) => {
  const ticket = await flightTicket(req.body);
  await ticket.save();
  res.json(ticket);
});

const deleteFlightTicket = asyncHandler(async (req, res) => {
  const ticket = await flightTicket.findById(req.params.id);
  if (!ticket) {
    res.status(404);
    throw new Error("Details not found");
  }
  await ticket.deleteOne();
  res.status(200).json(ticket);
});

module.exports = {
  getFlight,
  createFlightTicket,
  deleteFlightTicket,
};
