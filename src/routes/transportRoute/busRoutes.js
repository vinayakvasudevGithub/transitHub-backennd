const express = require("express");
const {
  getAllBuses,
  createBus,
  getBusById,
  updateBus,
  deleteBus,
  searchBus,
  getBusByAdmin,
} = require("../../controllers/transportController/busController");
const router = express.Router();

router.route("/").get(getAllBuses);
router.route("/admin").get(getBusByAdmin);

router.route("/search").get(searchBus);
router.route("/:id").get(getBusById);
router.route("/update/:id").put(updateBus);
router.route("/create").post(createBus);
router.route("/delete/:id").delete(deleteBus);

module.exports = router;
