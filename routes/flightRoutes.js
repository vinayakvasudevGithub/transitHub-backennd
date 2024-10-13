const express = require("express");
const {
  getflight,
  createFlight,
  flightBySearch,

  flightById,
  updateFlight,
  deleteFlight,
} = require("../controller/FlightCon");
const router = express.Router();

router.route("/").get(getflight);
router.route("/search").get(flightBySearch);
router.route("/:id").get(flightById);

router.route("/create").post(createFlight);
router.route("/update/:id").put(updateFlight);
router.route("/delete/:id").delete(deleteFlight);

module.exports = router;
