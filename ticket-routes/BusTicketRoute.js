const express = require("express");
const {
  getBus,
  createBusTicket,
  deleteBusTicket,
} = require("../ticket-controller/BusTicketCon");
const router = express.Router();

router.route("/").get(getBus);
router.route("/booking").post(createBusTicket);
router.route("/delete/:id").delete(deleteBusTicket);

module.exports = router;
