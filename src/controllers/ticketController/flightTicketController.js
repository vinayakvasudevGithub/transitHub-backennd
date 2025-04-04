const flightTicket = require("../../models/ticketModel/FlightTicket");
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const getFlightByUser = asyncHandler(async (req, res) => {
  try {
    const { token } = req.cookies;

    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const bookedTicket = await flightTicket.find({ "user.id": decoded.id });

    res.status(200).json(bookedTicket);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "server error" });
  }
});
const getFlight = asyncHandler(async (req, res) => {
  const ticket = await flightTicket.find();
  res.json(ticket);
});

// const createFlightTicket = asyncHandler(async (req, res) => {
//   const ticket = await flightTicket(req.body);
//   await ticket.save();
//   res.json(ticket);
// });
const createFlightTicket = asyncHandler(async (req, res) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      return res.status(401).json({ error: "not authorized" });
    }

    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const userId = decoded.id;
    const userName = decoded.name;

    const { flightDetails, userDetails, price, airlineTicketId } = req.body;

    const bookTicket = await flightTicket.create({
      airlineTicketId,
      user: {
        id: userId,
        transithubUser: userName,
      },
      flightDetails,
      userDetails,
      price,
    });

    res.status(200).json(bookTicket);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "server error" });
  }

  // const ticket = await flightTicket(req.body);
  // await ticket.save();
  // res.json(ticket);
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
  getFlightByUser,
};
