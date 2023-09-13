import { bookings } from "@/db/schema"
import * as z from "zod"

export const bookingSchema = z.object({
  message: z.string().optional(),
  type: z
    .enum(bookings.type.enumValues, {
      required_error: "Wybierz rodzaj wizyty",
      invalid_type_error: "Nieprawidłowy typ danych",
    })
    .default(bookings.type.enumValues[0]),
  // date: z.coerce.date({
  //   required_error: "Wybierz termin wizyty",
  //   invalid_type_error: "Nieprawidłowy format daty",
  // }),
  date: z.coerce.date({
    required_error: "Wybierz termin wizyty",
    invalid_type_error: "Nieprawidłowy typ danych",
  }),
  // .min(new Date(dayjs().format("YYYY-MM-DD"))),
  // time: z
  //   .string({
  //     required_error: "Wybierz godzinę wizyty",
  //     invalid_type_error: "Nieprawidłowy typ danych",
  //   })
  //   .datetime(),
  // time: z.string(),
  // time: z
  //   .string({
  //     required_error: "Wybierz godzinę wizyty",
  //     invalid_type_error: "Nieprawidłowy typ danych",
  //   })
  //   .datetime({ offset: true, precision: 0 }),
  // // .min(new Date(dayjs().add(4, "hour").format()))
  time: z
    .string({
      required_error: "Wybierz godzinę wizyty",
      invalid_type_error: "Nieprawidłowy typ danych",
    })
    .length(5, { message: "" })
    .regex(/^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/, {
      message: "Nieprawidłowy format godziny",
    }),
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
