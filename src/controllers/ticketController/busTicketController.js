const busTicket = require("../../models/ticketModel/BusTicket");
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

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
  try {
    const { token } = req.cookies;

    if (!token) {
      return res.status(401).json({ error: "not authorized" });
    }

    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const userId = decoded.id;
    const userName = decoded.name;

    const { busdetails, userDetails } = req.body;

    const bookTicket = await busTicket.create({
      user: {
        id: userId,
        transithubUser: userName,
      },
      busdetails,
      userDetails,
    });

    res.status(200).json(bookTicket);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "server error" });
  }
});

const getBookedTicketsByUser = asyncHandler(async (req, res) => {
  try {
    const { token } = req.cookies;
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    const bookedTicket = await busTicket.find({ "user.id": decoded.id });

    res.json(bookedTicket);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "server error" });
  }
});

// const createBusTicket = asyncHandler(async (req, res) => {
//   const { busdetails, userDetails } = req.body;

//   // Create a new bus ticket instance
//   const ticket = new busTicket({
//     busdetails,
//     userDetails,
//     // user_id: req.user.id,
//   });

//   // Save the ticket to the database
//   await ticket.save();

//   // Send the created ticket as a response
//   res.status(201).json(ticket);
// });
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
  getBookedTicketsByUser,
};
