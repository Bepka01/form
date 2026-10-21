import { z } from "zod";

export const registrationSchema = z.object({
  firstName: z.string().min(3, "Введите минимум 2 символа"),
  number: z
    .string()
    .regex(
      /^\+375 \(\d{2}\) \d{3}-\d{2}-\d{2}$/,
      "Введите полный номер телефона",
    ),
  email: z.email("Введите корректный email"),
  works: z.array(z.string()).min(1, "Выберите хотя бы одну работу"),
});

export type FormData = z.infer<typeof registrationSchema>;
