const express = require("express");
const cors = require("cors");
const router = require("./router/router");

const app = express();

app.use(express.json());

app.use(
  cors({
    origin: "*",
  })
);

app.use("/api", router);

module.exports = app;
