const mongoose = require("mongoose");

const adminSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "please add the user name for admin"],
    },
    email: {
      type: String,
      required: [true, "please add the email address"],
      unique: [true, "Email address allready taken"],
    },
    password: {
      type: String,
      required: [true, "please add the user password"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("adminpanel", adminSchema);
