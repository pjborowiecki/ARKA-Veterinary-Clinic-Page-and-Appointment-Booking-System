import * as z from "zod"

export const clinicSchema = z.object({
  latitude: z
    .string({
      required_error: "Szerokość geograficzna jest wymagana",
      invalid_type_error: "Szerokość geograficzna musi być tekstem",
    })
    .max(24, {
      message: "Szerokość geograficzna może mieć maksymalnie 24 znaki",
    })
    .regex(/^(-?[1-8]?\d(\.\d+)?|90(\.0+)?)$/, {
      message: "Niepoprawna wartość szerokości geograficznej",
    }),
  longitude: z
    .string({
      required_error: "Długość geograficzna jest wymagana",
      invalid_type_error: "Długość geograficzna musi być tekstem",
    })
    .max(24, {
      message: "Długość geograficzna może mieć maksymalnie 24 znaki",
    })
    .regex(/^(0|([1-9]|[1-9]\d|1[0-7]\d)(\.\d+)?)$|^180(\.0+)?$/, {
      message: "Niepoprawna wartość długości geograficznej",
    }),
  address: z
    .string({
      required_error: "Adres jest wymagany",
      invalid_type_error: "Adres musi być tekstem",
    })
    .min(3, { message: "Adres musi mieć co najmniej 3 znaki" })
    .max(128, { message: "Adres może mieć maksymalnie 128 znaków" }),
  phone_1: z
    .string({
      required_error: "Numer telefonu jest wymagany",
      invalid_type_error: "Numer telefonu musi być tekstem",
    })
    .min(8, { message: "Numer telefonu musi mieć co najmniej 8 znaków" })
    .max(16, { message: "Numer telefonu może mieć maksymalnie 16 znaków" })
    .regex(/^\+?[0-9 ]{9,15}$/, {
      message:
        "Niepoprawny format numeru telefonu. Dozwolone są tylko cyfry i opcjonalnie + na początku",
    }),
  phone_2: z
    .string({
      required_error: "Numer telefonu jest wymagany",
      invalid_type_error: "Numer telefonu musi być tekstem",
    })
    .min(8, { message: "Numer telefonu musi mieć co najmniej 8 znaków" })
    .max(16, { message: "Numer telefonu może mieć maksymalnie 16 znaków" })
    .regex(/^\+?[0-9 ]{9,15}$/, {
      message:
        "Niepoprawny format numeru telefonu. Dozwolone są tylko cyfry i opcjonalnie + na początku",
    }),
  email: z
    .string({
      required_error: "Email jest wymagany",
      invalid_type_error: "Email musi być tekstem",
    })
    .email({
      message: "Niepoprawny format adresu email",
    })
    .min(6, { message: "Email musi mieć co najmniej 6 znaków" })
    .max(64, { message: "Email może mieć maksymalnie 64 znaki" }),
})

export const getClinicSchema = z.object({
  id: z.number(),
  userId: z.string(),
})
