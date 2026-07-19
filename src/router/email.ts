import express from "express";
import { emailLimiter } from "../middleware/rate-limiter";
import { sanitizeBody } from "../middleware/sanitize-body";
import { accesToken } from "../middleware/acces-token";
import { buildAndSendEmail } from "../controller/email";

const router = express.Router();

router.post("/", emailLimiter, sanitizeBody, accesToken, buildAndSendEmail);

export default router;
