import type { NextFunction, Request, Response } from "express";
import jwt, { type JwtPayload } from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

interface AuthenticatedRequest extends Request {
  user?: string | JwtPayload;
}

export function authMiddleware(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) {
  const authHeader = (req.headers["authorization"] as string) ?? "";

  if (!authHeader) {
    return res.status(401).json({
      Message: "No token Provided",
    });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token!, JWT_SECRET as string);

    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({
      Message: "Invalid or expired token",
    });
  }
}

export function roleMiddleware(req: AuthenticatedRequest,res: Response,next: NextFunction) {
  const authHeader = (req.headers["authorization"] as string) ?? "";

  if (!authHeader) {
    return res.status(401).json({
      Message: "No token Provided",
    });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token!, JWT_SECRET as string) as JwtPayload;

    if (decoded.role && decoded.role === "ADMIN") {
      next();
      return;
    }

    return res.status(403).json({
        Message: "Access denied. Admins only"
    });
  } catch (error) {
    return res.status(403).json({
      Message: "Invalid or expired token",
    });
  }
}
