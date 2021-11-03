const express = require("express");
const cors = require("cors");
const compression = require("compression");
const recordRouter = require("./routes/record.route");

//SETTINGS
const app = express();

//MIDDLEWARES
app.use(compression());
app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//ROUTES
app.use("/", recordRouter);

module.exports = app;
