const instance = require("../../utils/razorpayInstance"); // Import Razorpay instance from razorpayInstance.js

const processPayment = async (req, res) => {
  const options = {
    amount: Number(req.body.amount) * 100, // amount in the smallest currency unit
    currency: "INR",
  };
  const order = await instance.orders.create(options);

  res.status(200).json({
    success: true,
    order,
    message: "Payment processed successfully",
  });
};

const getKey = async (req, res) => {
  res.status(200).json({
    key: process.env.RAZORPAY_KEY_ID,
  });
};

module.exports = {
  processPayment,
  getKey,
};
