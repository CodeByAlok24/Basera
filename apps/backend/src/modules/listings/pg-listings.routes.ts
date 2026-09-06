import { Router } from "express";
import { prisma } from "../../lib/prisma.js";
import { asyncHandler } from "../../middleware/async-handler.js";
import { authenticate } from "../../middleware/authenticate.js";
import { requireRole } from "../../middleware/require-role.js";
import { pgListingSchema } from "./listing.schemas.js";

export const pgListingsRouter = Router();

pgListingsRouter.get(
  "/",
  asyncHandler(async (req, res) => {
    const city = typeof req.query.city === "string" ? req.query.city : undefined;
    const minPrice = req.query.minPrice ? Number(req.query.minPrice) : undefined;
    const maxPrice = req.query.maxPrice ? Number(req.query.maxPrice) : undefined;

    const listings = await prisma.pgListing.findMany({
      where: {
        isActive: true,
        city: city ? { equals: city, mode: "insensitive" } : undefined,
        rent: {
          gte: minPrice,
          lte: maxPrice
        }
      },
      orderBy: { createdAt: "desc" },
      take: 50
    });

    res.json({ listings });
  })
);

pgListingsRouter.post(
  "/",
  authenticate,
  requireRole("pg_owner", "admin"),
  asyncHandler(async (req, res) => {
    const input = pgListingSchema.parse(req.body);
    const listing = await prisma.pgListing.create({
      data: {
        ownerId: req.user!.id,
        title: input.title,
        address: input.address,
        city: input.city,
        rent: input.rent,
        sharingType: input.sharingType,
        amenities: input.amenities,
        photos: input.photos
      }
    });

    res.status(201).json({ listing });
  })
);

