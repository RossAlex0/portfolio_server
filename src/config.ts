import express from "express";
import cors from "cors";
import router from "./router";

const app = express();

app.use(express.json());

app.use(
  cors({
    origin: [
      "https://www.cerclevignerons.com",
      "https://www.alex-rossignol.fr",
      "http://localhost:3000",
    ],
    credentials: true,
  })
);

app.options("*", cors());

app.use("/api", router);

export default app;
