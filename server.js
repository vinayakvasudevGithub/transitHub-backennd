require("dotenv").config();
const port = process.env.PORT;
const express = require("express");
const cors = require("cors");
const errorHandler = require("./middleware/errorHandler");
const connectDb = require("./dbConnection");
const app = express();

connectDb();
app.use(express.json());
app.use(cors());
app.use("/flight", require("./routes/flightRoutes"));
app.use("/bus", require("./routes/busRoutes"));
app.use("/train", require("./routes/trainRoutes"));
app.use(errorHandler);

app.listen(port, () => {
  console.log(`server running ${port}`);
});
