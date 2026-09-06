import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { env } from "../config/env.js";
import type { PlatformRole } from "./require-role.js";

type AccessTokenPayload = {
  sub: string;
  role: PlatformRole;
};

export function authenticate(req: Request, res: Response, next: NextFunction) {
  const header = req.headers.authorization;
  const token = header?.startsWith("Bearer ") ? header.slice("Bearer ".length) : undefined;

  if (!token) {
    return res.status(401).json({ error: "Login is required." });
  }

  try {
    const payload = jwt.verify(token, env.JWT_SECRET) as AccessTokenPayload;
    req.user = {
      id: payload.sub,
      role: payload.role
    };
    return next();
  } catch {
    return res.status(401).json({ error: "Session is invalid or expired." });
  }
}

