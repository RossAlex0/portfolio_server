import express from "express";
import {
  emailLimiter,
  sanitizeBody,
  verifyEmail,
  verifyToken,
} from "../middleware";
import { buildAndSendEmail } from "../controller/mail";

const router = express.Router();

router.post(
  "/new-send-email",
  emailLimiter,
  sanitizeBody,
  verifyToken,
  verifyEmail,
  buildAndSendEmail
);

// retro compatibility - await portfolioV.2 for use /new-send-email
router.post("/send-email", verifyEmail, buildAndSendEmail);

export default router;
