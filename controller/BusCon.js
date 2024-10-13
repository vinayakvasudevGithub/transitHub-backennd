const busData = require("../models/busModel");
const asyncHandler = require("express-async-handler");

const getBus = asyncHandler(async (req, res) => {
  const data = await busData.find();
  res.json(data);
});

const BusBySearch = asyncHandler(async (req, res) => {
  const data = await busData.find();
  const {
    query: { from, to },
  } = req;

  const filteredBus = data.filter((result) => {
    const isDepartureMatch = from
      ? result.stations.some(
          (stations) => stations.city.toLowerCase() === from.toLowerCase()
        )
      : true;
    const isArrivalMatch = to
      ? result.stations.some(
          (stations) => stations.city.toLowerCase() === to.toLowerCase()
        )
      : true;
    return isDepartureMatch, isArrivalMatch;
  });

  filteredBus.length > 0
    ? res.status(200).json(filteredBus)
    : res.status(404).json({ message: "no bus found" });
});

const busById = asyncHandler(async (req, res) => {
  const data = await busData.findById(req.params.id);
  if (!data) {
    res.status(404);
    throw new Error("bus not found");
  }
  res.status(200).json(data);
});

const createBus = asyncHandler(async (req, res) => {
  const data = await busData(req.body);
  await data.save();
  res.json(data);
});

const updateBus = asyncHandler(async (req, res) => {
  const data = await busData.findById(req.params.id);
  if (!data) {
    res.status(404);
    throw new Error("details not found");
  }
  const updated = await busData.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(200).json(updated);
});

const deleteBus = asyncHandler(async (req, res) => {
  const data = await busData.findById(req.params.id);
  if (!data) {
    res.status(404);
    throw new Error("bus details not found");
  }
  await data.deleteOne();
  res.status(200).json(data);
});

module.exports = {
  getBus,
  BusBySearch,
  createBus,
  deleteBus,
  busById,
  updateBus,
};
