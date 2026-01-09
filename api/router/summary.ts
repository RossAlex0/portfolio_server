import express from "express";
import { sendWeeklySummary } from "../controller/summary";
import { accesCron } from "../middleware/acces-cron";

const router = express.Router();

router.get("/", accesCron, sendWeeklySummary);

export default router;
