import z from "zod";

export const catalogSchema = z.object({
  id: z.number(),
  name: z.string(),
  slug: z.string(),
  phone_number: z.string(),
  email: z.string(),
  slogan: z.string(),
  resume: z.string(),
  background_image_url: z.string(),
  description: z.string(),
  instagran_link: z.string(),
});

export type Catalog = z.infer<typeof catalogSchema>;
