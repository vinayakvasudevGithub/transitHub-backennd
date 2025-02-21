const trainTicket = require("../../models/ticketModel/TrainTicket");
const asyncHandler = require("express-async-handler");

const getTrain = asyncHandler(async (req, res) => {
  const ticket = await trainTicket.find();
  res.json(ticket);
});

const createTrainTicket = asyncHandler(async (req, res) => {
  const ticket = await trainTicket(req.body);
  await ticket.save();
  res.json(ticket);
});

const deleteTrainTicket = asyncHandler(async (req, res) => {
  const ticket = await trainTicket.findById(req.params.id);

  if (!ticket) {
    res.status(404);
    throw new Error("Details not found");
  }

  await ticket.deleteOne();
  res.status(200).json(ticket);
});

module.exports = {
  getTrain,
  createTrainTicket,
  deleteTrainTicket,
};
