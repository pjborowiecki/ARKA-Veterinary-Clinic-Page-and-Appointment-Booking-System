import { emailSchema } from "@/validations/email"
import * as z from "zod"

const passwordSchema = z
  .string({
    required_error: "Hasło jest wymagane",
    invalid_type_error: "Nieprawidłowy typ danych",
  })
  .min(8, {
    message: "Hasło musi się składać z przynajmniej 8 znaków",
  })
  .max(256, {
    message: "Hasło nie może mieć więcej ni 256 znaków",
  })

export const signUpWithPasswordSchema = z
  .object({
    email: emailSchema,
    password: passwordSchema.regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
      {
        message:
          "Hasło musi mieć od 8 do 256 znaków, zawierać przynajmniej jedną wielką literę, jedną małą literę, jedną liczbę, oraz jedną znak specjalny",
      }
    ),
    confirmPassword: z.string(),
  })
  .refine((schema) => schema.password === schema.confirmPassword, {
    message: "Podane hasła są różne",
    path: ["confirmPassword"],
  })

export const signInWithEmailSchema = z.object({
  email: emailSchema,
})

export const signInWithPasswordSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
})

export const passwordResetSchema = z.object({
  email: emailSchema,
})

export const passwordUpdateSchema = z
  .object({
    password: passwordSchema.regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
      {
        message:
          "Hasło musi mieć od 8 do 256 znaków, zawierać przynajmniej jedną wielką literę, jedną małą literę, jedną liczbę, oraz jedną znak specjalny",
      }
    ),
    confirmPassword: z.string(),
  })
  .refine((schema) => schema.password === schema.confirmPassword, {
    message: "Podane hasła są różne",
    path: ["confirmPassword"],
  })

export const emailVerificationSchema = z.object({
  email: emailSchema,
})
