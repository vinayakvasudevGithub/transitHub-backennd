const express = require("express");
const {
  processPayment,
  getKey,
} = require("../../controllers/paymentCon/paymentCon");
const router = express.Router();

router.route("/process").post(processPayment);
router.route("/getkey").get(getKey);

module.exports = router;
