import { z } from "zod";

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/;

export const loginSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z
    .string()
    .min(8, "A senha deve ter pelo menos 8 caracteres")
    .regex(
      passwordRegex,
      "A senha deve conter pelo menos 1 letra maiúscula, 1 minúscula e 1 número"
    ),
});

export type LoginSchema = z.infer<typeof loginSchema>;
