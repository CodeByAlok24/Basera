import { z } from "zod";

export const pgListingSchema = z.object({
  title: z.string().min(3),
  address: z.string().min(5),
  city: z.string().min(2),
  rent: z.coerce.number().positive(),
  sharingType: z.string().min(2),
  amenities: z.array(z.string()).default([]),
  photos: z.array(z.string().url()).default([])
});

export const messListingSchema = z.object({
  name: z.string().min(3),
  address: z.string().min(5),
  city: z.string().min(2),
  menu: z.record(z.string(), z.array(z.string())).default({}),
  pricePerPlan: z.coerce.number().positive(),
  mealsPerDay: z.coerce.number().int().min(1).max(3)
});

