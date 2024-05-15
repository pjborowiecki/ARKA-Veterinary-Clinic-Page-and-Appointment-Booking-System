import * as z from "zod"

import { users } from "@/db/schema"
import { passwordSchema, userIdSchema } from "@/validations/auth"
import { emailSchema } from "@/validations/email"

export const userNameSchema = z
  .string({
    invalid_type_error: "Imię lub nazwisko muszą być tekstem",
  })
  .optional()

export const userSchema = z.object({
  name: userNameSchema,
  surname: userNameSchema,
  role: z
    .enum(users.role.enumValues, {
      required_error: "Rola jest wymagana",
      invalid_type_error:
        "Rola musi być jedną z predefiniowanych wartości tekstowych",
    })
    .default("klient"),
  email: emailSchema,
  password: passwordSchema.regex(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
    {
      message:
        "Hasło musi mieć od 8 do 256 znaków, zawierać przynajmniej jedną wielką literę, jedną małą literę, jedną liczbę, oraz jedną znak specjalny",
    }
  ),
})

export const getUserByEmailSchema = z.object({
  email: emailSchema,
})

export const getUserByIdSchema = z.object({
  id: userIdSchema,
})

export const getUserByResetPasswordTokenSchema = z.object({
  token: z.string(),
})

export const getUserByEmailVerificationTokenSchema = z.object({
  token: z.string(),
})

export const checkIfUserExistsSchema = z.object({
  id: userIdSchema,
})

export type GetUserByEmailInput = z.infer<typeof getUserByEmailSchema>

export type GetUserByIdInput = z.infer<typeof getUserByIdSchema>

export type GetUserByResetPasswordTokenInput = z.infer<
  typeof getUserByResetPasswordTokenSchema
>

export type GetUserByEmailVerificationTokenInput = z.infer<
  typeof getUserByEmailVerificationTokenSchema
>

export type CheckIfUserExistsInput = z.infer<typeof checkIfUserExistsSchema>
