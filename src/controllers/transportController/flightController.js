const asyncHandler = require("express-async-handler");
const flightData = require("../../models/transportModel/flightModel");
// const { query } = require("express");

//desc get flight details
//route GET /flight
//access public
const getflight = asyncHandler(async (req, res) => {
  const data = await flightData.find();
  res.json(data);
});

//get flight by query params
//route GET http://localhost:2001/flight/search?from=kannur&to=kochi
const flightBySearch = asyncHandler(async (req, res) => {
  const data = await flightData.find();

  const {
    query: { airline, from, to },
  } = req;

  const filteredFlights = data.filter((result) => {
    const isAirlineMatch = airline
      ? result.airline.toLowerCase() === airline.toLowerCase()
      : true;

    const isAirportMatch = from
      ? result.airport.some(
          (airport) => airport.city.toLowerCase() === from.toLowerCase()
        )
      : true;

    const isDestinationMatch = to
      ? result.destination.some(
          (destination) => destination.city.toLowerCase() === to.toLowerCase()
        )
      : true;

    return isAirlineMatch && isAirportMatch && isDestinationMatch;
  });

  if (filteredFlights.length > 0) {
    res.json(filteredFlights);
  } else {
    res.status(404).json({ message: "no flights found" });
  }
});

//desc get flight-details by id
//route GET flight/:id
//access public
const flightById = asyncHandler(async (req, res) => {
  const data = await flightData.findById(req.params.id);
  if (!data) {
    res.status(404);
    throw new Error("not found the flight");
  }
  res.status(200).json(data);
});

//desc create flight-details
//route POST flight/create
//access currently it is public ... but make it privet
const createFlight = asyncHandler(async (req, res) => {
  const data = await flightData(req.body);
  await data.save();
  res.json(data);
});

//desc update flight-details
//route PUT flight/update/:id
//access currently it is public ... but make it privet
const updateFlight = asyncHandler(async (req, res) => {
  console.log(req.params.id);
  res.status(200).json({ message: `updated msg from ${req.params.id}` });
});

//desc delete flight-details
//rote DELETE flight/delete/:id
const deleteFlight = asyncHandler(async (req, res) => {
  const data = await flightData.findById(req.params.id);
  if (!data) {
    res.status(404);
    throw new Error("flight details not found");
  }
  await data.deleteOne();
  res.status(200).json(data);
});

module.exports = {
  getflight,

  flightById,
  flightBySearch,
  createFlight,
  updateFlight,
  deleteFlight,
};
