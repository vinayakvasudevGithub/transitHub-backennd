const express = require("express");
const {
  getBus,
  createBusTicket,
  deleteBusTicket,
  BookedTicketByUser,
} = require("../../controllers/ticketController/busTicketController");
const validateToken = require("../../middlewares/authMiddleware");
const router = express.Router();

router.route("/").get(getBus);
router.use(validateToken);
router.route("/user").get(BookedTicketByUser);
router.route("/booking").post(createBusTicket);
router.route("/delete/:id").delete(deleteBusTicket);

module.exports = router;
