const express = require("express");
const cors = require("cors");
const errorHandler = require("./middlewares/errorHandler");
const connectDb = require("./config/DbConnections");
const dotenv = require("dotenv").config();
connectDb();
const app = express();
app.use(express.json());
app.use(cors());
app.use("/bus", require("./routes/busRoutes"));
app.use(errorHandler);

module.exports = app;
