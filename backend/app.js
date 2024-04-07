const express = require("express");
const morgan = require("morgan");
const locationRouter = require("./Routers/locationRouter");
const deviceRouter = require("./Routers/deviceRouter");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

let app = express();

app.use(express.json());
app.use(bodyParser.json());
app.use(cors());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use("/api/v1/location", locationRouter);
app.use("/api/v1/location", deviceRouter);
app.use("/api/v1/device", deviceRouter);
app.use((req, res, next) => {
  req.requesteAt = new Date().toISOString();
  next();
});

module.exports = app;
