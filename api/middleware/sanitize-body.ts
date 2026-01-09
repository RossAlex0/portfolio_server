import { Request, Response, NextFunction } from "express";
import sanitizeHtml from "sanitize-html";

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

  return next();
};
