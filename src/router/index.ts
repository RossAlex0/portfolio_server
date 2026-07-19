import express from "express";
import emailRouter from "./email";
import summaryRouter from "./summary";

const router = express.Router();

router.use("/email", emailRouter);

router.use("/summary", summaryRouter);

export default router;
