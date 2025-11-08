import Joi from "joi";
import { Request, Response, NextFunction } from "express";
import { Origin } from "../types";
import rateLimit from "express-rate-limit";
import sanitizeHtml from "sanitize-html";

const schema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().min(6).email().required(),
  subject: Joi.string().max(80).required(),
  message: Joi.string().required(),
});

export const verifyEmail = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  schema
    .validateAsync(req.body, { abortEarly: false })
    .then(() => next())
    .catch((error) =>
      res.status(400).json({
        errorMessage: "Invalid input. Please correct the errors and try again.",
        error,
      })
    );
};

export const emailLimiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 35,
  message: "Too many attempts, please try again later.",
});

export const verifyToken = (
  req: Request & { origin?: string },
  res: Response,
  next: NextFunction
) => {
  const token = req.headers["x-api-key"];

  if (!token) {
    res.status(401).json({ errorMessage: "Unauthorized" });
    return;
  }

  const isValidToken =
    token === process.env.TOKEN_SW1 || token === process.env.TOKEN_SW2;

  if (!isValidToken) {
    res.status(401).json({ errorMessage: "Unauthorized" });
    return;
  }

  req.origin = token === process.env.TOKEN_SW1 ? Origin.SW1 : Origin.SW2;

  next();
};

export const sanitizeBody = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.body || !(typeof req.body === "object")) {
    res.status(400).json({
      errorMessage: "Request body must be a valid JSON object.",
    });
    return;
  }

  const bodyKeys = Object.keys(req.body);

  for (const key of bodyKeys) {
    req.body[key] = sanitizeHtml(req.body[key] || "", {
      allowedTags: [],
      allowedAttributes: {},
    });
  }

  next();
};
