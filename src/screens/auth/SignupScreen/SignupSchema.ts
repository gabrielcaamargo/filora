import z from "zod";

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/;

export const signupSchema = z
  .object({
    firstName: z.string().min(1, "O nome é obrigatório"),
    lastName: z.string().min(1, "O sobrenome é obrigatório"),
    email: z.string().email("Email inválido"),
    password: z
      .string()
      .min(8, "A senha deve ter pelo menos 8 caracteres")
      .regex(
        passwordRegex,
        "A senha deve conter pelo menos 1 letra maiúscula, 1 minúscula e 1 número"
      ),
    confirmPassword: z
      .string()
      .min(8, "A senha deve ter pelo menos 8 caracteres"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "As senhas não coincidem",
  });

export type SignupSchema = z.infer<typeof signupSchema>;
