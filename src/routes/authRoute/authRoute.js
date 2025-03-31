const express = require("express");
const {
  register,
  allUser,
  login,
  profile,
} = require("../../controllers/authController/authController");
const router = express.Router();

router.route("/alluser").get(allUser);
router.route("/profile").get(profile);
router.route("/register").post(register);
router.route("/login").post(login);

module.exports = router;
