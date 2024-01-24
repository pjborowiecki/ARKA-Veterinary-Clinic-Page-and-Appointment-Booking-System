"use server"

import { unstable_noStore as noStore, revalidatePath } from "next/cache"
import { db } from "@/db"
import { psGetAllBookings } from "@/db/prepared/statements"
import { bookings, type Booking } from "@/db/schema"
import type { bookingSchema, getBookingSchema } from "@/validations/booking"
import { desc, eq, like } from "drizzle-orm"
import { type z } from "zod"

export async function getAllBookings(): Promise<Booking[] | null> {
  try {
    noStore()
    const bookings = await psGetAllBookings.execute()
    return bookings ? bookings : null
    // revalidatePath("")
  } catch (error) {
    console.error(error)
    throw new Error("Błąd przy wczytywaniu rezerwacji")
  }
}

export async function addBooking(
  input: z.infer<typeof bookingSchema>
): Promise<"success" | "fail"> {
  try {
    const response = await db.insert(bookings).values({ ...input })
    revalidatePath("/")
    revalidatePath(`/rezerwacja`)
    return response ? "success" : "fail"
  } catch (error) {
    console.error(error)
    throw new Error("Błąd przy dodawaniu rezerwacji")
  }
}

export async function updateBooking() {}

export async function deleteBooking(input: z.infer<typeof getBookingSchema>) {
  eq(bookings.id, input.id),
    await db.delete(bookings).where(eq(bookings.id, input.id))
}

export async function filterBookings(query: string) {
  if (query.length === 0) return null

  const filteredBookings = await db
    .select({
      id: bookings.id,
      name: bookings.name,
      type: bookings.type,
    })
    .from(bookings)
    .where(like(bookings.name, `%${query}%`))
    .orderBy(desc(bookings.createdAt))
    .limit(10)

  const bookingsByType = Object.values(bookings.type.enumValues).map(
    (type) => ({
      type,
      bookings: filteredBookings.filter((booking) => booking.type === type),
    })
  )

  return bookingsByType
}

// export async function getNextBookingId(
//   input: z.infer<typeof getBookingSchema>
// ) {
//   const booking = await db.query.bookings.findFirst({
//     where: eq(bookings.id, input.id),
//     orderBy: asc(bookings.id),
//   })

//   if (!booking) {
//     throw new Error("Nie znaleziono rezerwacji")
//   }

//   return booking.id
// }

// export async function getPreviousBookingId(
//   input: z.infer<typeof getBookingSchema>
// ) {
//   const booking = await db.query.bookings.findFirst({
//     where: lt(bookings.id, input.id),
//     orderBy: desc(bookings.id),
//   })

//   if (!booking) {
//     throw new Error("Nie znaleziono rezerwacji")
//   }

//   return booking.id
// }
