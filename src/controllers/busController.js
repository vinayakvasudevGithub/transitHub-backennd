const asyncHandler = require("express-async-handler");
// const BusModel = require("../models/Bus");
const BusModel = require("../models/busModel");

//@desc get all buses
//@route GET api/Bus
//@acces public
const getAllBuses = asyncHandler(async (req, res) => {
  const bus = await BusModel.find();
  res.status(200).json(bus);
});

//@desc get all buses
//@route GET api/bus/search?from=<-kannur->&to=<-mukkam->
//@acces public
const searchBus = asyncHandler(async (req, res) => {
  const bus = await BusModel.find();
  const {
    query: { from, to },
  } = req;

  const filteredBus = bus.filter((result) => {
    let departureIndex = -1;
    let arrivalIndex = -1;

    const isDepartureMatch = from
      ? result.stations.some((stations, index) => {
          if (stations.city.toLowerCase() === from.toLowerCase()) {
            departureIndex = index;
            return true;
          }
          return false;
        })
      : true;

    const isArrivalMatch = to
      ? result.stations.some((stations, index) => {
          if (stations.city.toLowerCase() === to.toLowerCase()) {
            arrivalIndex = index;
            return true;
          }
          return false;
        })
      : true;

    const isCorrectOrder = arrivalIndex > departureIndex;

    return isDepartureMatch && isArrivalMatch && isCorrectOrder;
  });

  filteredBus.length > 0
    ? res.status(200).json(filteredBus)
    : res.status(404).json({ message: "no bus found" });
});

// Create a new bus (Admin only)
//@route POST api/Bus/create
const createBus = asyncHandler(async (req, res) => {
  const { busname, busnumber, AC, stations, seatdetails, ticketprices } =
    req.body;

  if (
    !busname ||
    !busnumber ||
    !AC ||
    !stations ||
    !seatdetails ||
    !ticketprices
  ) {
    res.status(400);
    throw new Error("Please provide all required fields");
  }

  try {
    const existingBus = await BusModel.findOne({ busnumber });
    if (existingBus) {
      res.status(400);
      throw new Error("Bus with the same number already exists");
    }
    const bus = await BusModel.create(req.body);
    console.log(`New bus created: ${bus.busname} (Number: ${bus.busnumber})`);
    res.status(201).json(bus);
  } catch (error) {
    console.error("Error creating bus:", error.message);
    res
      .status(400)
      .json({ tilte: `Failed to create bus`, message: `${error.message}` });
  }
});

//@desc get buses by id
//@route GET api/Bus/:id
//@acces public
const getBusById = asyncHandler(async (req, res) => {
  try {
    const bus = await BusModel.findById(req.params.id);

    if (!bus) {
      res.status(404);
      throw new Error("Bus not found");
    }
    res.status(200).json(bus);
  } catch (error) {
    if (error.name === "CastError") {
      res.status(400);
      throw new Error("Invalid bus ID");
    }

    res.status(500);
    throw new Error("Server error");
  }
});

// Update bus details (Admin only)
//@route PUT api/Bus/update/:id
const updateBus = asyncHandler(async (req, res) => {
  const bus = await BusModel.findById(req.params.id);
  if (!bus) {
    res.status(404);
    throw new Error("bus not found");
  }
  const updatedbus = await BusModel.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(200).json(updatedbus);
});

// Delete a bus (Admin only)
//@route DELETE api/Bus/update/:id
const deleteBus = asyncHandler(async (req, res) => {
  try {
    const bus = await BusModel.findById(req.params.id);
    if (!bus) {
      res.status(404).json({ message: "bus not found" });
      return;
    }
    await bus.deleteOne();
    res.status(200).json({ message: "bus deleted successfully", train: bus });
  } catch (error) {
    console.error("Error deleting bus:", error.message);
    res
      .status(500)
      .json({ message: "Failed to delete bus", error: error.message });
  }
});

module.exports = {
  getAllBuses,
  searchBus,
  createBus,
  getBusById,
  updateBus,
  deleteBus,
};
