import express from "express";
import { sendWeeklySummary } from "../controller/summary";
import { accesToken } from "../middleware/acces-token";

const router = express.Router();

router.get("/", accesToken, sendWeeklySummary);

export default router;
