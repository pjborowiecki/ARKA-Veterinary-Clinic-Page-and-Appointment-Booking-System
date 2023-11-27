import { db } from "@/db"
import {
  bookings,
  businessHours,
  clinics,
  datesUnavailable,
  users,
} from "@/db/schema"
import { eq, sql } from "drizzle-orm"

export const psGetUserByEmail = db
  .select()
  .from(users)
  .where(eq(users.email, sql.placeholder("email")))
  .prepare()

export const psGetUserByEmailVerificationToken = db
  .select()
  .from(users)
  .where(
    eq(users.emailVerificationToken, sql.placeholder("emailVerificationToken"))
  )
  .prepare()

export const psGetUserByResetPasswordToken = db
  .select()
  .from(users)
  .where(eq(users.resetPasswordToken, sql.placeholder("resetPasswordToken")))
  .prepare()

export const psGetClinic = db.select().from(clinics).prepare()

export const psGetAllBookings = db.select().from(bookings).prepare()

export const psGetBusinessHours = db.select().from(businessHours).prepare()

export const psGetDatesUnavailable = db
  .select()
  .from(datesUnavailable)
  .prepare()

export const psGetAllDoctorBookings = db
  .select()
  .from(bookings)
  .where(eq(bookings.type, "weterynarz"))
  .prepare()

export const psGetAllGroomerBookings = db
  .select()
  .from(bookings)
  .where(eq(bookings.type, "salon fryzur"))
  .prepare()
