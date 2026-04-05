// src/middleware/rbac.middleware.ts
import type { Request, Response, NextFunction } from "express";

export const authorize = (roles: string[]) => {
  return (req: any, res: Response, next: NextFunction) => {
    const userRole = req.user?.role;

    if (!roles.includes(userRole)) {
      return res.status(403).json({ message: "Forbidden" });
    }

    next();
  };
};