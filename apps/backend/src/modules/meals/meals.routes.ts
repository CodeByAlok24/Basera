import { Router } from "express";
import { canCancelMeal, cancellationCutoff } from "./meal-policy.js";

export const mealsRouter = Router();

mealsRouter.post("/:id/cancel", (req, res) => {
  const servingTime = new Date(String(req.body.servingTime ?? ""));
  const now = new Date();

  if (Number.isNaN(servingTime.getTime())) {
    return res.status(400).json({ error: "servingTime is required until database lookup is connected." });
  }

  if (!canCancelMeal(now, servingTime)) {
    return res.status(409).json({
      error: "Too late to cancel this meal.",
      cancelBefore: cancellationCutoff(servingTime).toISOString()
    });
  }

  return res.status(202).json({
    mealId: req.params.id,
    status: "cancellation_accepted",
    nextStep: "Connect this route to a transaction that updates meal_schedule and credits wallet_transactions."
  });
});

