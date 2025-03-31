const express = require("express");
const {
  createContact,
  getContact,
  getAll,
} = require("../../controllers/ticketController/contactCon");

const router = express.Router();

router.route("/create").post(createContact);
router.route("/get").get(getContact);
router.route("/all").get(getAll);

module.exports = router;
