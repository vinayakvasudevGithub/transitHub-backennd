const express = require("express");
const cors = require("cors");
const errorHandler = require("./middlewares/errorHandler");
const connectDb = require("./config/DbConnections");
const dotenv = require("dotenv").config();
connectDb();
const app = express();
app.use(express.json());
app.use(cors());
//transpost
app.use("/bus", require("./routes/transportRoute/busRoutes"));
app.use("/flight", require("./routes/transportRoute/flightRoutes"));
app.use("/train", require("./routes/transportRoute/trainRoutes"));
//booking
app.use("/busticket", require("./routes/ticketRoute/BusTicketRoute"));
app.use("/flightticket", require("./routes/ticketRoute/FlightTicketRoute"));
app.use("/trainticket", require("./routes/ticketRoute/TrainTicketRoute"));
//users
app.use("/users", require("./routes/userRoute/userRoutes"));
//error handler
app.use(errorHandler);

module.exports = app;
