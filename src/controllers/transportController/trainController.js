const asyncHandler = require("express-async-handler");
const trainData = require("../../models/transportModel/trainModel");

const GetTrain = asyncHandler(async (req, res) => {
  try {
    const data = await trainData.find();
    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching trains:", error.message);
    res
      .status(500)
      .json({ message: "Failed to fetch trains", error: error.message });
  }
});

const GetTrainById = asyncHandler(async (req, res) => {
  try {
    const data = await trainData.findById(req.params.id);
    if (!data) {
      res.status(404).json({ message: "Train not found" });
      return;
    }
    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching train by ID:", error.message);
    res
      .status(500)
      .json({ message: "Failed to fetch train", error: error.message });
  }
});

const TrainBySearch = asyncHandler(async (req, res) => {
  try {
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
      return isDepartureMatch && isArrivalMatch; // Fix logical issue: Ensure both match
    });

    if (filteredTrain.length > 0) {
      res.status(200).json(filteredTrain);
    } else {
      res.status(404).json({ message: "No trains found" });
    }
  } catch (error) {
    console.error("Error searching trains:", error.message);
    res
      .status(500)
      .json({ message: "Failed to search trains", error: error.message });
  }
});

const CreateTrain = asyncHandler(async (req, res) => {
  try {
    const data = new trainData(req.body);
    await data.save();
    res.status(201).json(data);
  } catch (error) {
    console.error("Error creating train:", error.message);
    res
      .status(400)
      .json({ message: "Failed to create train", error: error.message });
  }
});

const DeleteTrain = asyncHandler(async (req, res) => {
  try {
    const data = await trainData.findById(req.params.id);
    if (!data) {
      res.status(404).json({ message: "Train not found" });
      return;
    }
    await data.deleteOne();
    res
      .status(200)
      .json({ message: "Train deleted successfully", train: data });
  } catch (error) {
    console.error("Error deleting train:", error.message);
    res
      .status(500)
      .json({ message: "Failed to delete train", error: error.message });
  }
});

module.exports = {
  GetTrain,
  CreateTrain,
  GetTrainById,
  DeleteTrain,
  TrainBySearch,
};
