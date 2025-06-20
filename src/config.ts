import express from "express";
import cors from "cors";
import router from "./router/router";

const app = express();

app.use(express.json());

app.use(
  cors({
    origin: "*",
  })
);

app.use("/api", router);

export default app;
