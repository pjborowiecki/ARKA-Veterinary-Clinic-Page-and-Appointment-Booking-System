"use server"

import { revalidatePath } from "next/cache"
import { db } from "@/db"
import { bookings } from "@/db/schema"
import {
  and,
  asc,
  desc,
  eq,
  gt,
  gte,
  inArray,
  like,
  lt,
  lte,
  not,
  sql,
} from "drizzle-orm"
import type { z } from "zod"

import type {
  bookingSchema,
  getBookingSchema,
  getBookingsSchema,
} from "@/lib/validations/booking"

export async function filterBookingsAction(query: string) {
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

export async function getBookingsAction() {}

export async function checkBookingAction(input: {
  // date: Date (?)
  // time: string (?)
  // type: string (?)
}) {
  const alreadyTaken = await db.query.bookings.findFirst({
    // where: TODO
  })

  if (alreadyTaken) {
    throw new Error("Wybrany termin jest już zajęty")
  }
}

export async function addBookingAction(input: z.infer<typeof bookingSchema>) {
  await db.insert(bookings).values({ ...input })

  revalidatePath(`/rezerwacje`)
}

export async function updateBookingAction() {}

export async function deleteBookingAction(
  input: z.infer<typeof getBookingSchema>
) {
  eq(bookings.id, input.id),
    await db.delete(bookings).where(eq(bookings.id, input.id))
}

export async function getNextBookingIdAction(
  input: z.infer<typeof getBookingSchema>
) {
  const booking = await db.query.bookings.findFirst({
    where: eq(bookings.id, input.id),
    orderBy: asc(bookings.id),
  })

  if (!booking) {
    throw new Error("Nie znaleziono rezerwacji")
  }

  return booking.id
}

export async function getPreviousBookingIdAction(
  input: z.infer<typeof getBookingSchema>
) {
  const booking = await db.query.bookings.findFirst({
    where: lt(bookings.id, input.id),
    orderBy: desc(bookings.id),
  })

  if (!booking) {
    throw new Error("Nie znaleziono rezerwacji")
  }

  return booking.id
}
