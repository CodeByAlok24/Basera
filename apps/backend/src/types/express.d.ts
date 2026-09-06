import type { PlatformRole } from "../middleware/require-role.js";

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        role: PlatformRole;
      };
    }
  }
}

export {};

