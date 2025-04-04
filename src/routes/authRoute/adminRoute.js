const express = require("express");
// const { route } = require("./authRoute");
const {
  getAllAdmin,
  createAdmin,
  adminLogin,
  adminProfile,
} = require("../../controllers/authController/adminAuth");

const router = express.Router();

router.route("/").get(getAllAdmin);
router.route("/create").post(createAdmin);
router.route("/login").post(adminLogin);
router.route("/profile").get(adminProfile);

module.exports = router;
