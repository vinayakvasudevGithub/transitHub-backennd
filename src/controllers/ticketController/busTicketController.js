const busTicket = require("../../models/ticketModel/BusTicket");
const asyncHandler = require("express-async-handler");

const getBus = asyncHandler(async (req, res) => {
  const ticket = await busTicket.find();
  res.json(ticket);
});

//@desc Get all booked bus ticket
//@route
//@access privet
const BookedTicketByUser = asyncHandler(async (req, res) => {
  const ticket = await busTicket.find({ user_id: req.user.id });
  res.json(ticket);
});

//@desc book bus ticket
//@route
//@access privet
const createBusTicket = asyncHandler(async (req, res) => {
  const { busdetails, userDetails } = req.body;

  // Create a new bus ticket instance
  const ticket = new busTicket({
    busdetails,
    userDetails,
    // user_id: req.user.id,
  });

  // Save the ticket to the database
  await ticket.save();

  // Send the created ticket as a response
  res.status(201).json(ticket);
});
// const createBusTicket = asyncHandler(async (req, res) => {
//   const ticket = await busTicket(req.body);
//   await ticket.save();
//   res.json(ticket);
// });

//@desc delete booked bus ticket
//@route
//@access privet
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
  BookedTicketByUser,
  createBusTicket,
  deleteBusTicket,
};
