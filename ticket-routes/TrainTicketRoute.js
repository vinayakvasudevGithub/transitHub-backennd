const express = require("express");
const {
  getTrain,
  createTrainTicket,
  deleteTrainTicket,
} = require("../ticket-controller/TrainTicketCon");
const router = express.Router();

router.route("/").get(getTrain);
router.route("/create").post(createTrainTicket);
router.route("/delete/:id").delete(deleteTrainTicket);

module.exports = router;
