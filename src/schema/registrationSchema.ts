import { z } from "zod";
import { isValidPhoneNumber } from "libphonenumber-js";

export const registrationSchema = z.object({
  firstName: z.string().min(3, "Введите минимум 2 символа"),
  number: z
    .string()
    .min(1, "Введите номер телефона")
    .refine(
      (value) => isValidPhoneNumber(value),
      "Введите корректный номер телефона",
    ),
  email: z.email("Введите корректный email"),
  works: z.array(z.string()).min(1, "Выберите хотя бы одну работу"),
});

export type FormData = z.infer<typeof registrationSchema>;
