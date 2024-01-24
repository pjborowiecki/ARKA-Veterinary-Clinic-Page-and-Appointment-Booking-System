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

export const signInWithPasswordSchema = z.object({
  email: emailSchema,
  password: z.string({
    required_error: "Password is required",
    invalid_type_error: "Password must be a string",
  }),
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

export const passwordUpdateSchemaExtended = z
  .object({
    password: passwordSchema.regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
      {
        message:
          "Password must contain at least 8 characters, including one uppercase, one lowercase, one number and one special character",
      }
    ),
    confirmPassword: z.string(),
    resetPasswordToken: z
      .string({
        required_error: "Reset password token is required",
        invalid_type_error: "Reset password token must be a string",
      })
      .min(16)
      .max(256),
  })
  .refine((schema) => schema.password === schema.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  })

export const emailVerificationSchema = z.object({
  email: emailSchema,
})

export type SignUpWithPasswordFormInput = z.infer<
  typeof signUpWithPasswordSchema
>

export type SignInWithPasswordFormInput = z.infer<
  typeof signInWithPasswordSchema
>

export type PasswordResetFormInput = z.infer<typeof passwordResetSchema>

export type PasswordUpdateFormInput = z.infer<typeof passwordUpdateSchema>

export type PasswordUpdateFormInputExtended = z.infer<
  typeof passwordUpdateSchemaExtended
>

export type EmailVerificationFormInput = z.infer<typeof emailVerificationSchema>
