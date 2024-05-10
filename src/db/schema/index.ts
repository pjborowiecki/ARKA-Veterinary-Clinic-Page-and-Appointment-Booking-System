import { type AdapterAccount } from "@auth/core/adapters"
import { relations, sql } from "drizzle-orm"
import {
  date,
  integer,
  pgEnum,
  pgTable,
  primaryKey,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core"

export const userRoleEnum = pgEnum("user_role", ["klient", "administrator"])

export const operatingStatusEnum = pgEnum("operating_status", [
  "otwarte",
  "zamknięte",
])

export const serviceTypeEnum = pgEnum("service_type", [
  "weterynarz",
  "salon fryzur",
])

export const bookingStatusEnum = pgEnum("booking_status", [
  "niepotwierdzone",
  "potwierdzone",
  "anulowane",
  "odrzucone",
])

export const accounts = pgTable(
  "accounts",
  {
    userId: varchar("userId", { length: 512 })
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: varchar("type", { length: 256 })
      .$type<AdapterAccount["type"]>()
      .notNull(),
    provider: varchar("provider", { length: 256 }).notNull(),
    providerAccountId: varchar("providerAccountId", { length: 512 }).notNull(),
    refresh_token: varchar("refresh_token", { length: 512 }),
    access_token: varchar("access_token", { length: 512 }),
    expires_at: integer("expires_at"),
    token_type: varchar("token_type", { length: 256 }),
    scope: varchar("scope", { length: 256 }),
    id_token: varchar("id_token", { length: 512 }),
    session_state: varchar("session_state", { length: 256 }),
  },
  (account) => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
  })
)

export const accountsRelations = relations(accounts, ({ one }) => ({
  user: one(users, {
    fields: [accounts.userId],
    references: [users.id],
  }),
}))

export const sessions = pgTable("sessions", {
  sessionToken: varchar("sessionToken", { length: 512 }).notNull().primaryKey(),
  userId: varchar("userId", { length: 512 })
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expires: timestamp("expires", { mode: "date" }).notNull(),
})

export const sessionsRelations = relations(sessions, ({ one }) => ({
  user: one(users, {
    fields: [sessions.userId],
    references: [users.id],
  }),
}))

export const users = pgTable("users", {
  id: varchar("id", { length: 512 }).notNull().primaryKey(),
  role: userRoleEnum("role").notNull().default("klient"),
  name: varchar("name", { length: 64 }),
  email: varchar("email", { length: 64 }).unique().notNull(),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  emailVerificationToken: varchar("emailVerificationToken", {
    length: 512,
  }).unique(),
  passwordHash: varchar("passwordHash", { length: 256 }),
  resetPasswordToken: varchar("resetPasswordToken", { length: 512 }).unique(),
  resetPasswordTokenExpiry: timestamp("resetPasswordTokenExpires", {
    mode: "date",
  }),
  image: varchar("image", { length: 512 }),
  createdAt: timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { mode: "date" }).default(
    sql`current_timestamp`
  ),
})

export const userRelations = relations(users, ({ one, many }) => ({
  account: one(accounts, {
    fields: [users.id],
    references: [accounts.userId],
  }),
  session: many(sessions),
}))

export const verificationTokens = pgTable(
  "verificationTokens",
  {
    identifier: varchar("identifier", { length: 512 }).notNull(),
    token: varchar("token", { length: 512 }).notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (vt) => ({
    compoundKey: primaryKey({
      columns: [vt.identifier, vt.token],
    }),
  })
)

export const clinics = pgTable("clinics", {
  id: varchar("id", { length: 128 }).notNull().primaryKey(),
  longitude: varchar("longitude", { length: 24 }).notNull(),
  latitude: varchar("latitude", { length: 24 }).notNull(),
  address: varchar("address", { length: 128 }).notNull(),
  phone_1: varchar("phone_1", { length: 16 }).notNull(),
  phone_2: varchar("phone_2", { length: 16 }).notNull(),
  email: varchar("email", { length: 64 }).notNull(),
  createdAt: timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { mode: "date" }).default(
    sql`current_timestamp`
  ),
})

export const businessHours = pgTable("business_hours", {
  id: varchar("id", { length: 128 }).notNull().primaryKey(),
  mondayStatus: operatingStatusEnum("monday_status")
    .notNull()
    .default("otwarte"),
  tuesdayStatus: operatingStatusEnum("tuesday_status")
    .notNull()
    .default("otwarte"),
  wednesdayStatus: operatingStatusEnum("wednesday_status")
    .notNull()
    .default("otwarte"),
  thursdayStatus: operatingStatusEnum("thursday_status")
    .notNull()
    .default("otwarte"),
  fridayStatus: operatingStatusEnum("friday_status")
    .notNull()
    .default("otwarte"),
  saturdayStatus: operatingStatusEnum("saturday_status")
    .notNull()
    .default("otwarte"),
  sundayStatus: operatingStatusEnum("sunday_status")
    .notNull()
    .default("otwarte"),
  mondayOpening: varchar("monday_opening", { length: 5 })
    .notNull()
    .default("09:00"),
  tuesdayOpening: varchar("tuesday_opening", { length: 5 })
    .notNull()
    .default("09:00"),
  wednesdayOpening: varchar("wednesday_opening", { length: 5 })
    .notNull()
    .default("09:00"),
  thursdayOpening: varchar("thursday_opening", { length: 5 })
    .notNull()
    .default("09:00"),
  fridayOpening: varchar("friday_opening", { length: 5 })
    .notNull()
    .default("09:00"),
  saturdayOpening: varchar("saturday_opening", { length: 5 })
    .notNull()
    .default("09:00"),
  sundayOpening: varchar("sunday_opening", { length: 5 })
    .notNull()
    .default("09:00"),
  mondayClosing: varchar("monday_closing", { length: 5 })
    .notNull()
    .default("17:00"),
  tuesdayClosing: varchar("tuesday_closing", { length: 5 })
    .notNull()
    .default("17:00"),
  wednesdayClosing: varchar("wednesday_closing", { length: 5 })
    .notNull()
    .default("17:00"),
  thursdayClosing: varchar("thursday_closing", { length: 5 })
    .notNull()
    .default("17:00"),
  fridayClosing: varchar("friday_closing", { length: 5 })
    .notNull()
    .default("17:00"),
  saturdayClosing: varchar("saturday_closing", { length: 5 })
    .notNull()
    .default("17:00"),
  sundayClosing: varchar("sunday_closing", { length: 5 })
    .notNull()
    .default("17:00"),
  createdAt: timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { mode: "date" }).default(
    sql`current_timestamp`
  ),
})

export const bookings = pgTable("bookings", {
  id: varchar("id", { length: 128 }).notNull().primaryKey(),
  type: serviceTypeEnum("type").notNull().default("weterynarz"),
  date: date("date", { mode: "date" }).notNull(),
  time: varchar("time", { length: 5 }).notNull(),
  firstName: varchar("firstName", { length: 32 }).notNull(),
  lastName: varchar("lastName", { length: 64 }).notNull(),
  email: varchar("email", { length: 64 }).notNull(),
  phone: varchar("phone", { length: 16 }).notNull(),
  message: varchar("message", { length: 10240 }),
  status: bookingStatusEnum("status").notNull().default("niepotwierdzone"),
  createdAt: timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { mode: "date" }).default(
    sql`current_timestamp`
  ),
})

export const datesUnavailable = pgTable("datesUnavailable", {
  id: varchar("id", { length: 128 }).notNull().primaryKey(),
  date: date("date", { mode: "date" }).notNull(),
  createdAt: timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { mode: "date" }).default(
    sql`current_timestamp`
  ),
})

export type User = typeof users.$inferSelect
export type NewUser = typeof users.$inferInsert

export type Account = typeof accounts.$inferSelect
export type NewAccount = typeof accounts.$inferInsert

export type Session = typeof sessions.$inferSelect
export type NewSession = typeof sessions.$inferInsert

export type VerificationToken = typeof verificationTokens.$inferSelect
export type NewVerificationToken = typeof verificationTokens.$inferInsert

export type Clinic = typeof clinics.$inferSelect
export type NewClinic = typeof clinics.$inferInsert

export type Booking = typeof bookings.$inferSelect
export type NewBooking = typeof bookings.$inferInsert

export type BusinessHours = typeof businessHours.$inferSelect
export type NewBusinessHours = typeof businessHours.$inferInsert

export type DateUnavailable = typeof datesUnavailable.$inferSelect
export type NewDateUnavailable = typeof datesUnavailable.$inferInsert
