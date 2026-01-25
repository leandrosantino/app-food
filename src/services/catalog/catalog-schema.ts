import z from "zod";

export const catalogSchema = z.object({
  title: z.string(),
  slug: z.string(),
});
