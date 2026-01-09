import express from "express";
import { sendWeeklySummary } from "../controller/summary";

const router = express.Router();

router.get("/", sendWeeklySummary);

export default router;
