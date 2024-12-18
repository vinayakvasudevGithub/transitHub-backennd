const busTicket = require("../ticket-models/BusTicket");
const asyncHandler = require("express-async-handler");

const getBus = asyncHandler(async (req, res) => {
  const ticket = await busTicket.find();
  res.json(ticket);
});

const createBusTicket = asyncHandler(async (req, res) => {
  const ticket = await busTicket(req.body);
  await ticket.save();
  res.json(ticket);
});

const deleteBusTicket = asyncHandler(async (req, res) => {
  const ticket = await busTicket.findById(req.params.id);
  if (!ticket) {
    res.status(404);
    throw new Error("Details not found");
  }
  await ticket.deleteOne();
  res.status(200).json(ticket);
});

module.exports = {
  getBus,
  createBusTicket,
  deleteBusTicket,
};
