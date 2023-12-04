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

export const contactFormSchema = z.object({
  email: emailSchema,
  name: z
    .string({
      required_error: "Imię jest wymagane",
      invalid_type_error: "Nieprawidłowy format danych",
    })
    .max(128, {
      message: "Imię nie może mieć więcej ni 128 znaków",
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
