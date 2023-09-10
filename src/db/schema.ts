import { relations } from "drizzle-orm"
import {
  boolean,
  date,
  datetime,
  int,
  mysqlEnum,
  mysqlTable,
  serial,
  text,
  time,
  timestamp,
  varchar,
} from "drizzle-orm/mysql-core"

export const clinics = mysqlTable("clinics", {
  id: serial("id").primaryKey(),
  userId: varchar("userId", { length: 191 }).notNull(),
  longitude: varchar("longitude", { length: 24 }).notNull(),
  latitude: varchar("latitude", { length: 24 }).notNull(),
  address: varchar("address", { length: 128 }).notNull(),
  phone: varchar("phone", { length: 16 }).notNull(),
  email: varchar("email", { length: 64 }).notNull(),
  createdAt: timestamp("createdAt").defaultNow(),
  updatedAt: timestamp("updatedAt").defaultNow(),
})

export type Clinic = typeof clinics.$inferSelect
export type NewClinic = typeof clinics.$inferInsert

export const clinicsRelations = relations(clinics, ({ many }) => ({
  bookings: many(bookings),
  openingHours: many(businessHours),
  datesUnavailable: many(datesUnavailable),
}))

export const businessHours = mysqlTable("openingHours", {
  id: serial("id").primaryKey(),
  dayOfWeek: mysqlEnum("dayOfWeek", [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
    "sunday",
  ]).notNull(),
  openingTime: time("openingTime").notNull(),
  closingTime: time("closingTime").notNull(),
  clinicId: int("clinicId").notNull(),
  createdAt: timestamp("createdAt").defaultNow(),
  updatedAt: timestamp("updatedAt").defaultNow(),
})

export type BusinessHour = typeof businessHours.$inferSelect
export type NewBusinessHour = typeof businessHours.$inferInsert

export const openingHoursRelations = relations(businessHours, ({ one }) => ({
  clinic: one(clinics, {
    fields: [businessHours.clinicId],
    references: [clinics.id],
  }),
}))

export const bookings = mysqlTable("bookings", {
  id: serial("id").primaryKey(),
  message: text("message"),
  type: mysqlEnum("type", ["weterynarz", "salon fryzur"])
    .notNull()
    .default("weterynarz"),
  slot: datetime("slot").notNull(),
  date: date("date").notNull(),
  time: time("time").notNull(),
  // date: date("date").notNull(),
  // time: varchar("time", { length: 5 }).notNull(),
  firstName: varchar("firstName", { length: 32 }).notNull(),
  lastName: varchar("lastName", { length: 32 }).notNull(),
  email: varchar("email", { length: 64 }).notNull(),
  phone: varchar("phone", { length: 16 }).notNull(),
  rodo: boolean("rodo").notNull().default(false),
  status: mysqlEnum("status", [
    "niepotwierdzone",
    "potwierdzone",
    "anulowane",
    "odrzucone",
  ])
    .notNull()
    .default("niepotwierdzone"),
  clinicId: int("clinicId").notNull(),
  createdAt: timestamp("createdAt").defaultNow(),
  updatedAt: timestamp("updatedAt").defaultNow(),
})

export type Booking = typeof bookings.$inferSelect
export type NewBooking = typeof bookings.$inferInsert

export const bookingsRelations = relations(bookings, ({ one }) => ({
  clinic: one(clinics, {
    fields: [bookings.clinicId],
    references: [clinics.id],
  }),
}))

export const datesUnavailable = mysqlTable("datesUnavailable", {
  id: serial("id").primaryKey(),
  date: date("date").notNull(),
  clinicId: int("clinicId").notNull(),
  createdAt: timestamp("createdAt").defaultNow(),
})

export type DateUnavailable = typeof datesUnavailable.$inferSelect
export type NewDateUnavailable = typeof datesUnavailable.$inferInsert

export const datesUnavailableRelations = relations(
  datesUnavailable,
  ({ one }) => ({
    clinic: one(clinics, {
      fields: [datesUnavailable.clinicId],
      references: [clinics.id],
    }),
  })
)
