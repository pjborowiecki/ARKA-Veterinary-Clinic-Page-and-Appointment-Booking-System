import * as z from "zod"

import { emailSchema } from "@/validations/email"

export const userIdSchema = z
  .string({
    required_error: "Id użytkownika jest wymagane",
    invalid_type_error: "Dane wejściowe muszą być tekstem",
  })
  .min(1, {
    message: "Id musi mieć przynajmniej 1 znak",
  })
  .max(128, {
    message: "Id może mieć maksymalnie 128 znaków",
  })

export const passwordSchema = z
  .string({
    required_error: "Hasło jest wymagane",
    invalid_type_error: "Nieprawidłowy typ danych",
  })
  .min(8, {
    message: "Hasło musi się składać z przynajmniej 8 znaków",
  })
  .max(256, {
    message: "Hasło nie może mieć więcej niż 256 znaków",
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
    required_error: "Hasło jest wymagane",
    invalid_type_error: "Nieprawidłowy typ danych",
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
          "Hasło musi mieć od 8 do 256 znaków, zawierać przynajmniej jedną wielką literę, jedną małą literę, jedną liczbę, oraz jedną znak specjalny",
      }
    ),
    confirmPassword: z.string(),
    resetPasswordToken: z
      .string({
        required_error: "Token do resetowania hasła jest wymagany",
        invalid_type_error: "Nieprawidłowy typ danych",
      })
      .min(16)
      .max(512),
  })
  .refine((schema) => schema.password === schema.confirmPassword, {
    message: "Podane hasła są różne",
    path: ["confirmPassword"],
  })

export const linkOAuthAccountSchema = z.object({
  userId: userIdSchema,
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

export type LinkOAuthAccountInput = z.infer<typeof linkOAuthAccountSchema>
