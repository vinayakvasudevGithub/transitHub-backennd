const express = require("express");

const {
  GetTrain,
  CreateTrain,
  GetTrainById,
  DeleteTrain,
  TrainBySearch,
} = require("../../controllers/transportController/trainController");

const router = express.Router();

router.route("/").get(GetTrain);
router.route("/search").get(TrainBySearch);
router.route("/:id").get(GetTrainById);
router.route("/create").post(CreateTrain);
router.route("/delete/:id").delete(DeleteTrain);

module.exports = router;
