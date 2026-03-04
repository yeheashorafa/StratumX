import { z } from "zod";

export const createPageSchema = z.object({
  businessId: z.number(),
  slug: z.string().min(2),
  translations: z.array(
    z.object({
      lang: z.string(),
      title: z.string().min(2),
      content: z.string().min(5),
    })
  ),
});

export const createServiceSchema = z.object({
  businessId: z.number(),
  translations: z.array(
    z.object({
      lang: z.string(),
      title: z.string().min(2),
      description: z.string().min(5),
    })
  ),
});