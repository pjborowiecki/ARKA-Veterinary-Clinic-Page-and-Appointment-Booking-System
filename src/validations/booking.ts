import { bookings } from "@/db/schema"
import { hourSchema } from "@/validations/availability"
import * as z from "zod"

export const bookingSchema = z.object({
  type: z
    .enum(bookings.type.enumValues, {
      required_error: "Wybierz rodzaj wizyty",
      invalid_type_error: "Nieprawidłowy typ danych",
    })
    .default(bookings.type.enumValues[0]),
  date: z.coerce.date({
    required_error: "Wybierz termin wizyty",
    invalid_type_error: "Nieprawidłowy typ danych",
  }),
  time: hourSchema,
  firstName: z
    .string({
      required_error: "Pole jest wymagane",
      invalid_type_error: "Nieprawidłowy typ danych",
    })
    .max(32, {
      message: "Imię powinno składać się z maksymalnie 32 znaków",
    }),
  lastName: z
    .string({
      required_error: "Pole jest wymagane",
      invalid_type_error: "Nieprawidłowy typ danych",
    })
    .max(32, {
      message: "Nazwisko powinno składać się z maksymalnie 32 znaków",
    }),
  email: z
    .string({
      required_error: "Pole jest wymagane",
      invalid_type_error: "Nieprawidłowy typ danych",
    })
    .email(),
  phone: z
    .string({
      required_error: "Pole jest wymagane",
      invalid_type_error: "Nieprawidłowy typ danych",
    })
    .min(9, {
      message: "Numer telefonu powinien składać się z przynajmniej 9 znaków",
    })
    .max(20, {
      message: "Numer telefonu powinien składać się z maksymalnie 20 znaków",
    }),
  message: z.string().optional(),

  // rodo: z
  //   .boolean({
  //     required_error: "Zgoda na przetwarzanie danych jest wymagana",
  //     invalid_type_error: "Nieprawidłowy typ danych",
  //   })
  //   .default(false)
  //   .refine((value) => value === true, {
  //     message: "Zgoda na przetwarzanie danych jest wymagana",
  //   }),
  status: z
    .enum(bookings.status.enumValues)
    .default(bookings.status.enumValues[0]),
})

export const filterBookingsSchema = z.object({})

export const getBookingSchema = z.object({
  id: z.number(),
})

export const getBookingsSchema = z.object({})
