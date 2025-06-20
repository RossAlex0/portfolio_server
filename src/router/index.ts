import express, { Request, Response } from "express";
import { emailLimiter, verifyEmail, verifyToken } from "../middleware";
import { buildAndSendEmail } from "../controller";

const router = express.Router();

router.post(
  "/new-send-email",
  emailLimiter,
  verifyToken,
  verifyEmail,
  buildAndSendEmail
);
// retro compatibility - await portfolioV.2 for use /new-send-email
router.post("/send-email", verifyEmail, buildAndSendEmail);

export default router;
