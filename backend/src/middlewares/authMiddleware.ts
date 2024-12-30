import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwtUtils";

export interface CustomRequest<T = any> extends Request {
  user?: {
    id: string;
    email: string;
    plan: string;
  };
  body: T; // Generic type for the request body
}

export const protect = (req: CustomRequest, res: Response, next: NextFunction): void => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      res.status(401).json({ error: "Access denied, no token provided." });
      return;
    }

    const decoded = verifyToken(token); // Your custom token verification logic
    if (!decoded) {
      res.status(401).json({ error: "Invalid token." });
      return;
    }

    req.user = decoded as { id: string; email: string; plan: string };
    next();
  } catch (error) {
    console.error("Authentication error:", error);
    res.status(500).json({ error: "Server error during authentication." });
  }
};
