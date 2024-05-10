import * as z from "zod"

import { bookings } from "@/db/schema"
import { hourSchema } from "@/validations/availability"

export const bookingIdSchema = z
  .string({
    required_error: "Id rezerwacji jest wymagane",
    invalid_type_error: "Dane wejściowe muszą być tekstem",
  })
  .min(1, {
    message: "Id musi mieć przynajmniej 1 znak",
  })
  .max(128, {
    message: "Id może mieć maksymalnie 32 znaki",
  })

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

export const addBookingSchema = bookingSchema

export const updateBookingSchema = bookingSchema.extend({
  id: bookingIdSchema,
})

export const deleteBookingSchema = z.object({
  id: bookingIdSchema,
})

export const checkIfBookingExistsSchema = z.object({
  id: bookingIdSchema,
})

export const filterBookingsSchema = z.object({
  query: z.string().optional(),
})

export type AddBookingInput = z.infer<typeof addBookingSchema>

export type UpdateBookingInput = z.infer<typeof updateBookingSchema>

export type DeleteBookingInput = z.infer<typeof deleteBookingSchema>

export type CheckIfBookingExistsInput = z.infer<
  typeof checkIfBookingExistsSchema
>

export type FilterBookingsInput = z.infer<typeof filterBookingsSchema>
