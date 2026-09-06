import type { NextFunction, Request, Response } from "express";

export type PlatformRole = "student" | "pg_owner" | "mess_owner" | "admin";

export function requireRole(...roles: PlatformRole[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;

    if (!user || !roles.includes(user.role)) {
      return res.status(403).json({ error: "You do not have access to this action." });
    }

    return next();
  };
}

