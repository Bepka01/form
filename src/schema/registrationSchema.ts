import { z } from "zod";
import { isValidPhoneNumber } from "libphonenumber-js";

export const registrationSchema = z.object({
  firstName: z
    .string()
    .regex(/^\s*\S+(?:\s+\S+){1,2}\s*$/, "Введите от 2 до 3 слов"),
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
