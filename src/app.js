const express = require("express");
const cors = require("cors");
const errorHandler = require("./middlewares/errorHandler");
const connectDb = require("./config/DbConnections");
const dotenv = require("dotenv").config();
const cookieParser = require("cookie-parser");

// const Razorpay = require("razorpay");

connectDb();
const app = express();
app.use(express.json());

// const instance = new Razorpay({
//   key_id: process.env.RAZORPAY_KEY_ID,
//   key_secret: process.env.RAZORPAY_KEY_SECRET,
// });

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);

app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

//payment
app.use("/payment", require("./routes/paymentRoute/paymentRoute"));

//transpost
app.use("/bus", require("./routes/transportRoute/busRoutes"));
app.use("/flight", require("./routes/transportRoute/flightRoutes"));
app.use("/train", require("./routes/transportRoute/trainRoutes"));

//booking
app.use("/busticket", require("./routes/ticketRoute/BusTicketRoute"));
app.use("/flightticket", require("./routes/ticketRoute/FlightTicketRoute"));
app.use("/trainticket", require("./routes/ticketRoute/TrainTicketRoute"));

// auth
app.use("/auth", require("./routes/authRoute/authRoute"));

// conatct
app.use("/contact", require("./routes/ticketRoute/contactRoute"));

//admin
app.use("/admin", require("./routes/authRoute/adminRoute"));

app.use(errorHandler);

module.exports = app;
