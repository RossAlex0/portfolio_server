import express, { Request, Response } from "express";
import { emailLimiter, verifyEmail, verifyToken } from "../middleware";
import { buildAndSendEmail } from "../controller";

const router = express.Router();

router.get("/test", (_req: Request, res: Response) => {
  res.json({ message: "Ca marche" });
});

router.post(
  "/new-send-email",
  emailLimiter,
  verifyToken,
  verifyEmail,
  buildAndSendEmail
);
// retro compatibility - await portfolioV.2 for use /new-send-email
router.post("/send-email", verifyEmail, buildAndSendEmail);

router.post("/test", (req: Request, res: Response) => {
  const test = req.body.test;
  res.json({ message: test });
});

export default router;
