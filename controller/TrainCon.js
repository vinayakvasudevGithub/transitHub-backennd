const asyncHandler = require("express-async-handler");
const trainData = require("../models/trainModel");

const GetTrain = asyncHandler(async (req, res) => {
  const data = await trainData.find();
  res.json(data);
});

const GetTrainById = asyncHandler(async (req, res) => {
  const data = await trainData.findById(req.params.id);
  if (!data) {
    res.status(404);
    throw new Error("train not found");
  }
  res.status(200).json(data);
});

const TrainBySearch = asyncHandler(async (req, res) => {
  const data = await trainData.find();
  const {
    query: { from, to },
  } = req;

  const filteredTrain = data.filter((result) => {
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
  filteredTrain.length > 0
    ? res.status(200).json(filteredTrain)
    : res.status(404).json({ message: "no bus found" });
});

const CreateTrain = asyncHandler(async (req, res) => {
  const data = await trainData(req.body);
  await data.save();
  res.json(data);
});

const DeleteTrain = asyncHandler(async (req, res) => {
  const data = await trainData.findById(req.params.id);
  if (!data) {
    res.status(404);
    throw new Error("train not found");
  }
  await data.deleteOne();
  res.status(200).json(data);
});

module.exports = {
  GetTrain,
  CreateTrain,
  GetTrainById,
  DeleteTrain,
  TrainBySearch,
};
