import { z } from "zod";

export const createCategorySchema = z.object({
  businessId: z.number(),
  parentId: z.number().nullable().optional(),
  translations: z.array(
    z.object({
      lang: z.string(),
      name: z.string().min(2),
      slug: z.string().min(2),
    })
  ),
});