import * as z from "zod"

export const authSchema = z.object({
  email: z.string().email({
    message: "Proszę podać poprawny adres email",
  }),
  password: z
    .string()
    .min(8, {
      message: "Hasło musi mieć przynajmniej 8 znaków",
    })
    .max(100)
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/, {
      message:
        "Hasło musi składać się z przynajmniej 8 znaków, w tym przynajmniej jednej wielkiej litery, jednej małej litery, jednej cyfry i jednego znaku specjalnego",
    }),
})

export const verfifyEmailSchema = z.object({
  code: z
    .string()
    .min(6, {
      message: "Kod weryfikacyjny musi składać się z dokładnie 6 znaków",
    })
    .max(6),
})

export const checkEmailSchema = z.object({
  email: authSchema.shape.email,
})

export const resetPasswordSchema = z
  .object({
    password: authSchema.shape.password,
    confirmPassword: authSchema.shape.password,
    code: verfifyEmailSchema.shape.code,
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Hasła nie są takie same",
    path: ["confirmPassword"],
  })

export const userPrivateMetadataSchema = z.object({
  role: z.enum(["user", "admin"]),
})
