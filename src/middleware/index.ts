import Joi from "joi";
import { Request, Response, NextFunction } from "express";
import { EmailInfo } from "../types";
import rateLimit from "express-rate-limit";

export const verifyEmail = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userEmail: EmailInfo = req.body;

  const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().min(6).email().required(),
    subject: Joi.string().max(80).required(),
    message: Joi.string().required(),
  });

  await schema
    .validateAsync(userEmail, { abortEarly: false })
    .then(next)
    .catch((error) =>
      res.status(400).json({
        message: `Votre saisie est invalide, veuillez réessayer.`,
        msgError: error,
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
    res.status(401).json({ message: "Clé manquante, requête non autorisée." });
    return;
  }

  const isValidToken =
    token === process.env.TOKEN_SW1 || token === process.env.TOKEN_SW2;

  if (!isValidToken) {
    res.status(401).json({ message: "Clé refusé, requête non autorisée." });
    return;
  }

  next();
};
