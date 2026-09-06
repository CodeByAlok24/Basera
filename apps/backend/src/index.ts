import cors from "cors";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import { env } from "./config/env.js";
import { authRouter } from "./modules/auth/auth.routes.js";
import { healthRouter } from "./modules/health/health.routes.js";
import { messListingsRouter } from "./modules/listings/mess-listings.routes.js";
import { pgListingsRouter } from "./modules/listings/pg-listings.routes.js";
import { mealsRouter } from "./modules/meals/meals.routes.js";

const app = express();

app.use(helmet());
app.use(cors({ origin: env.WEB_APP_URL, credentials: true }));
app.use(express.json());
app.use(morgan("dev"));

app.use("/api/health", healthRouter);
app.use("/api/auth", authRouter);
app.use("/api/pg-listings", pgListingsRouter);
app.use("/api/mess-listings", messListingsRouter);
app.use("/api/meals", mealsRouter);

app.use((_req, res) => {
  res.status(404).json({ error: "Route not found" });
});

app.use((error: unknown, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  if (error instanceof Error && "issues" in error) {
    return res.status(400).json({ error: "Validation failed.", details: error });
  }

  console.error(error);
  return res.status(500).json({ error: "Something went wrong." });
});

app.listen(env.API_PORT, () => {
  console.log(`Basera API listening on port ${env.API_PORT}`);
});
