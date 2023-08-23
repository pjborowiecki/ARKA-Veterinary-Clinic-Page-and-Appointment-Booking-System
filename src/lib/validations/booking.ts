import { bookings } from "@/db/schema"
import * as z from "zod"

export const bookingSchema = z.object({
  message: z.string().optional(),
  type: z
    .enum(bookings.type.enumValues, {
      required_error: "Nieprawidłowy typ rezerwacji",
    })
    .default(bookings.type.enumValues[0]),
  date: z.coerce.date({
    required_error: "Wybierz termin wizyty",
    invalid_type_error: "Nieprawidłowy format daty",
  }),
  // date: z.date({ required_error: "Wybierz termin wizyty" }),
  time: z.string({ required_error: "Wybierz godzinę wizyty" }),
  name: z.string().min(2, { message: "Pole jest wymagane" }),
  surname: z.string().min(2, { message: "Pole jest wymagane" }),
  email: z.string().email({ message: "Nieprawidłowy adres email" }),
  phone: z.string().min(9, { message: "Pole jest wymagane" }),
  rodo: z.boolean().default(true),
})

export const filterBookingsSchema = z.object({})

export const getBookingSchema = z.object({
  id: z.number(),
})

export const getBookingsSchema = z.object({})
