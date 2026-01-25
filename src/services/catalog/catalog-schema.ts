import z from "zod";

export const catalogSchema = z.object({
  id: z.number(),
  title: z.string(),
  slug: z.string(),
});

export type Catalog = z.infer<typeof catalogSchema>;
