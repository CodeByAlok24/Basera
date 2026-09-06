import { Router } from "express";
import { prisma } from "../../lib/prisma.js";
import { asyncHandler } from "../../middleware/async-handler.js";
import { authenticate } from "../../middleware/authenticate.js";
import { requireRole } from "../../middleware/require-role.js";
import { messListingSchema } from "./listing.schemas.js";

export const messListingsRouter = Router();

messListingsRouter.get(
  "/",
  asyncHandler(async (req, res) => {
    const city = typeof req.query.city === "string" ? req.query.city : undefined;
    const listings = await prisma.messListing.findMany({
      where: {
        isActive: true,
        city: city ? { equals: city, mode: "insensitive" } : undefined
      },
      orderBy: { createdAt: "desc" },
      take: 50
    });

    res.json({ listings });
  })
);

messListingsRouter.post(
  "/",
  authenticate,
  requireRole("mess_owner", "admin"),
  asyncHandler(async (req, res) => {
    const input = messListingSchema.parse(req.body);
    const listing = await prisma.messListing.create({
      data: {
        ownerId: req.user!.id,
        name: input.name,
        address: input.address,
        city: input.city,
        menu: input.menu,
        pricePerPlan: input.pricePerPlan,
        mealsPerDay: input.mealsPerDay
      }
    });

    res.status(201).json({ listing });
  })
);

