import * as z from "zod"

export const emailSchema = z
  .string({
    required_error: "Email jest wymagany",
    invalid_type_error: "Nieprawidłowy typ danych",
  })
  .min(5, {
    message: "Email musi składać się z przynamniej 5 znaków",
  })
  .max(64, {
    message: "Email nie może mieć więcej ni 64 znaki",
  })
  .email({
    message: "Proszę podać poprawny adres email",
  })

export const emailVerificationSchema = z.object({
  email: emailSchema,
})

export const markEmailAsVerifiedSchema = z.object({
  token: z.string(),
})

export const checkIfEmailVerifiedSchema = z.object({
  email: emailSchema,
})

export const contactFormSchema = z.object({
  email: emailSchema,
  firstName: z.string({
    required_error: "Imię jest wymagane",
    invalid_type_error: "Nieprawidłowy typ danych",
  }),
  lastName: z.string({
    required_error: "Nazwisko jest wymagane",
    invalid_type_error: "Nieprawidłowy typ danych",
  }),
  // TODO: Consider adding a regex to further validate the phone number
  phone: z.string({
    required_error: "Numer telefonu jest wymagany",
    invalid_type_error: "Nieprawidłowy typ danych",
  }),
  message: z
    .string({
      required_error: "Wiadomość jest wymagana",
      invalid_type_error: "Nieprawidłowy format danych",
    })
    .max(10240, {
      message: "Wiadomość nie może mieć więcej niż 10240 znaków",
    }),
})

export type EmailVerificationFormInput = z.infer<typeof emailVerificationSchema>

export type MarkEmailAsVerifiedInput = z.infer<typeof markEmailAsVerifiedSchema>

export type CheckIfEmailVerifiedInput = z.infer<
  typeof checkIfEmailVerifiedSchema
>

export type ContactFormInput = z.infer<typeof contactFormSchema>
