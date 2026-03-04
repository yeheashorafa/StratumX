import { z } from "zod";

export const createProductSchema = z.object({
  businessId: z.number(),
  categoryId: z.number(),
  price: z.number().positive(),
  stock: z.number().int().nonnegative(),
  sku: z.string().min(3),

  translations: z.array(
    z.object({
      lang: z.string(),
      name: z.string().min(2),
      description: z.string().min(5),
    })
  ),

  images: z.array(
    z.object({
      url: z.string(),
      altText: z.string().optional(),
      isPrimary: z.boolean().optional(),
    })
  ).optional(),
});