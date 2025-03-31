const express = require("express");
const cors = require("cors");
const errorHandler = require("./middlewares/errorHandler");
const connectDb = require("./config/DbConnections");
const dotenv = require("dotenv").config();
const cookieParser = require("cookie-parser");

connectDb();
const app = express();
app.use(express.json());

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);

app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

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

app.use(errorHandler);

module.exports = app;
