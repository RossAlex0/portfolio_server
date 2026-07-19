import { Request, Response, NextFunction } from "express";
import { getEnv } from "../utils/getEnv";

export const accesCron = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  const secretKey = getEnv("CRON_SECRET");

  if (authHeader !== `Bearer ${secretKey}`) {
    res.status(401).json({ errorMessage: "Unauthorized" });
    return;
  }

  next();
};
