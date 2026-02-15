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
  theme_color: z.string(),
  brand_image_url: z.string(),
});

export type Catalog = z.infer<typeof catalogSchema>;

export const addressSchema = z.object({
  id: z.number().int().positive().optional(),
  street: z.string().min(1),
  number: z.string().min(1),
  city: z.string().min(1),
  state: z.string().min(1),
  country: z.string().min(1),
  zip_code: z.string().min(1),
  catalog_id: z.number().int().positive(),
});

export type Address = z.infer<typeof addressSchema>;

export const openingHoursSchema = z
  .object({
    id: z.number().int().positive().optional(),
    day_of_week: z.string().min(1),
    status: z.enum(["aberto", "fechado"]),
    open_time: z
      .string()
      .regex(/^\d{2}:\d{2}$/)
      .nullable(),
    close_time: z
      .string()
      .regex(/^\d{2}:\d{2}$/)
      .nullable(),
    catalog_id: z.number().int().positive(),
  })
  .refine(
    (data) =>
      data.status === "aberto"
        ? data.open_time !== null && data.close_time !== null
        : data.open_time === null && data.close_time === null,
    {
      message:
        "Horários devem ser nulos quando fechado e obrigatórios quando aberto",
    },
  );

export type OpeningHours = z.infer<typeof openingHoursSchema>;
