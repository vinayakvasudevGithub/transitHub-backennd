const express = require("express");

const {
  getFlight,
  createFlightTicket,
  deleteFlightTicket,
} = require("../../controllers/ticketController/flightTicketController");

const router = express.Router();

router.route("/").get(getFlight);
router.route("/booking").post(createFlightTicket);
router.route("/delete/:id").delete(deleteFlightTicket);

module.exports = router;
