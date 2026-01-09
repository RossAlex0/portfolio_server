import { Request, Response, NextFunction } from "express";
import { Origin } from "../types";

export const accesToken = (
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
