import dotenv from "dotenv";
import { resolve } from "node:path";
import { z } from "zod";

dotenv.config({ path: resolve(process.cwd(), "../../.env") });
dotenv.config();

const envSchema = z.object({
  API_PORT: z.coerce.number().default(Number(process.env.PORT) || 4000),
  DATABASE_URL: z.string().min(1),
  REDIS_URL: z.string().min(1).optional(),
  JWT_SECRET: z.string().min(32),
  JWT_REFRESH_SECRET: z.string().min(32),
  WEB_APP_URL: z
    .string()
    .url()
    .default("http://localhost:3000")
    .transform((val) => val.replace(/\/+$/, "")),
  RAZORPAY_KEY_ID: z.string().optional(),
  RAZORPAY_KEY_SECRET: z.string().optional()
});

export const env = envSchema.parse(process.env);
