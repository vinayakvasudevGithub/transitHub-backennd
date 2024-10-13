const express = require("express");
const {
  getBus,
  createBus,
  deleteBus,
  busById,
  updateBus,
  BusBySearch,
} = require("../controller/BusCon");

const router = express.Router();

router.route("/").get(getBus);
router.route("/search").get(BusBySearch);
router.route("/:id").get(busById);
router.route("/create").post(createBus);
router.route("/update/:id").put(updateBus);
router.route("/delete/:id").delete(deleteBus);

module.exports = router;
