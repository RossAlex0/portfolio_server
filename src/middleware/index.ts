import Joi from "joi";
import { Request, Response, NextFunction } from "express";
import { EmailInfo, Origin } from "../types";
import rateLimit from "express-rate-limit";

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
        errorMessage: `Votre saisie est invalide, veuillez réessayer.`,
        error,
      })
    );
};

export const emailLimiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 35,
  message: "Trop de tentatives, réessayez plus tard.",
});

export const verifyToken = (
  req: Request,
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

  (req as any).origin =
    token === process.env.TOKEN_SW1 ? Origin.SW1 : Origin.SW2;

  next();
};
