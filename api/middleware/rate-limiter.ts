import rateLimit from "express-rate-limit";

export const emailLimiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 35,
  message: "Too many attempts, please try again later.",
});
