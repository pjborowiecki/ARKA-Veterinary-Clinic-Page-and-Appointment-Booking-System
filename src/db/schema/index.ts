import { type AdapterAccount } from "@auth/core/adapters"
import { relations } from "drizzle-orm"
import {
  boolean,
  datetime,
  int,
  mysqlEnum,
  mysqlTable,
  primaryKey,
  serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/mysql-core"

export const accounts = mysqlTable(
  "account",
  {
    userId: varchar("userId", { length: 255 }).notNull(),
    // .references(() => users.id, { onDelete: "cascade" }),
    type: varchar("type", { length: 255 })
      .$type<AdapterAccount["type"]>()
      .notNull(),
    provider: varchar("provider", { length: 255 }).notNull(),
    providerAccountId: varchar("providerAccountId", { length: 255 }).notNull(),
    refresh_token: varchar("refresh_token", { length: 255 }),
    access_token: varchar("access_token", { length: 255 }),
    expires_at: int("expires_at"),
    token_type: varchar("token_type", { length: 255 }),
    scope: varchar("scope", { length: 255 }),
    id_token: varchar("id_token", { length: 255 }),
    session_state: varchar("session_state", { length: 255 }),
  },
  (account) => ({
    compoundKey: primaryKey(account.provider, account.providerAccountId),
  })
)

export const accountsRelations = relations(accounts, ({ one }) => ({
  user: one(users, {
    fields: [accounts.userId],
    references: [users.id],
  }),
}))

export const sessions = mysqlTable("session", {
  sessionToken: varchar("sessionToken", { length: 255 }).notNull().primaryKey(),
  userId: varchar("userId", { length: 255 }).notNull(),
  // .references(() => users.id, { onDelete: "cascade" }),
  expires: timestamp("expires", { mode: "date" }).notNull(),
})

export const sessionsRelations = relations(sessions, ({ one }) => ({
  user: one(users, {
    fields: [sessions.userId],
    references: [users.id],
  }),
}))

export const users = mysqlTable("user", {
  id: varchar("id", { length: 255 }).notNull().primaryKey(),
  name: varchar("name", { length: 255 }),
  email: varchar("email", { length: 255 }).notNull(),
  emailVerificationToken: varchar("emailVerificationToken", {
    length: 255,
  }).unique(),
  emailVerified: timestamp("emailVerified", {
    mode: "date",
    fsp: 3,
  }),
  passwordHash: text("passwordHash"),
  resetPasswordToken: varchar("resetPasswordToken", { length: 255 }).unique(),
  resetPasswordTokenExpiry: timestamp("resetPasswordTokenExpires", {
    mode: "date",
    fsp: 3,
  }),
  image: varchar("image", { length: 255 }),
  createdAt: timestamp("createdAt", { mode: "date", fsp: 3 }).defaultNow(),
})

export const userRelations = relations(users, ({ one, many }) => ({
  account: one(accounts, {
    fields: [users.id],
    references: [accounts.userId],
  }),
  session: many(sessions),
}))

export const verificationTokens = mysqlTable(
  "verificationToken",
  {
    identifier: varchar("identifier", { length: 255 }).notNull(),
    token: varchar("token", { length: 255 }).notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (vt) => ({
    compoundKey: primaryKey(vt.identifier, vt.token),
  })
)

export const clinics = mysqlTable("clinics", {
  id: serial("id").primaryKey().autoincrement(),
  longitude: varchar("longitude", { length: 24 }).notNull(),
  latitude: varchar("latitude", { length: 24 }).notNull(),
  address: varchar("address", { length: 128 }).notNull(),
  phone_1: varchar("phone_1", { length: 16 }).notNull(),
  phone_2: varchar("phone_2", { length: 16 }).notNull(),
  email: varchar("email", { length: 64 }).notNull(),
  createdAt: timestamp("createdAt").defaultNow(),
  updatedAt: timestamp("updatedAt").defaultNow(),
})

export const clinicsRelations = relations(clinics, ({ one, many }) => ({
  bookings: many(bookings),
  openingHours: one(businessHours),
  datesUnavailable: many(datesUnavailable),
}))

export const businessHours = mysqlTable("businessHours", {
  id: serial("id").primaryKey().autoincrement(),
  clinicId: int("clinicId").notNull(),
  userId: varchar("userId", { length: 191 }).notNull(),
  mondayStatus: mysqlEnum("mondayStatus", ["otwarte", "zamknięte"])
    .notNull()
    .default("otwarte"),
  tuesdayStatus: mysqlEnum("tuesdayStatus", ["otwarte", "zamknięte"])
    .notNull()
    .default("otwarte"),
  wednesdayStatus: mysqlEnum("wednesdayStatus", ["otwarte", "zamknięte"])
    .notNull()
    .default("otwarte"),
  thursdayStatus: mysqlEnum("thursdayStatus", ["otwarte", "zamknięte"])
    .notNull()
    .default("otwarte"),
  fridayStatus: mysqlEnum("fridayStatus", ["otwarte", "zamknięte"])
    .notNull()
    .default("otwarte"),
  saturdayStatus: mysqlEnum("saturdayStatus", ["otwarte", "zamknięte"])
    .notNull()
    .default("otwarte"),
  sundayStatus: mysqlEnum("sundayStatus", ["otwarte", "zamknięte"])
    .notNull()
    .default("otwarte"),
  mondayOpening: varchar("mondayOpening", { length: 5 })
    .notNull()
    .default("09:00"),
  tuesdayOpening: varchar("tuesdayOpening", { length: 5 })
    .notNull()
    .default("09:00"),
  wednesdayOpening: varchar("wednesdayOpening", { length: 5 })
    .notNull()
    .default("09:00"),
  thursdayOpening: varchar("thursdayOpening", { length: 5 })
    .notNull()
    .default("09:00"),
  fridayOpening: varchar("fridayOpening", { length: 5 })
    .notNull()
    .default("09:00"),
  saturdayOpening: varchar("saturdayOpening", { length: 5 })
    .notNull()
    .default("09:00"),
  sundayOpening: varchar("sundayOpening", { length: 5 })
    .notNull()
    .default("09:00"),
  mondayClosing: varchar("mondayClosing", { length: 5 })
    .notNull()
    .default("17:00"),
  tuesdayClosing: varchar("tuesdayClosing", { length: 5 })
    .notNull()
    .default("17:00"),
  wednesdayClosing: varchar("wednesdayClosing", { length: 5 })
    .notNull()
    .default("17:00"),
  thursdayClosing: varchar("thursdayClosing", { length: 5 })
    .notNull()
    .default("17:00"),
  fridayClosing: varchar("fridayClosing", { length: 5 })
    .notNull()
    .default("17:00"),
  saturdayClosing: varchar("saturdayClosing", { length: 5 })
    .notNull()
    .default("17:00"),
  sundayClosing: varchar("sundayClosing", { length: 5 })
    .notNull()
    .default("17:00"),
  createdAt: timestamp("createdAt").defaultNow(),
  updatedAt: timestamp("updatedAt").defaultNow(),
})

// export const businessHours = mysqlTable("businessHours", {
//   id: serial("id").primaryKey(),
//   clinicId: int("clinicId").notNull(),
//   userId: varchar("userId", { length: 191 }).notNull(),
//   day: mysqlEnum("dayOfWeek", [
//     "monday",
//     "tuesday",
//     "wednesday",
//     "thursday",
//     "friday",
//     "saturday",
//     "sunday",
//   ]).notNull().unique(),
//   ordinal: int("dayOfWeek").notNull(),
//   status: mysqlEnum("status", ["otwarte", "zamknięte"]).notNull().default("otwarte"),
//   openingTime: time("openingTime").notNull(),
//   closingTime: time("closingTime").notNull(),
//   createdAt: timestamp("createdAt").defaultNow(),
//   updatedAt: timestamp("updatedAt").defaultNow(),
// })

export const businessHoursRelations = relations(businessHours, ({ one }) => ({
  clinic: one(clinics, {
    fields: [businessHours.clinicId],
    references: [clinics.id],
  }),
}))

export const bookings = mysqlTable("bookings", {
  id: serial("id").primaryKey().autoincrement(),
  message: text("message"),
  type: mysqlEnum("type", ["weterynarz", "salon fryzur"])
    .notNull()
    .default("weterynarz"),
  slot: datetime("slot").notNull(),
  // date: date("date").notNull(),
  // time: time("time").notNull(),
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

export const bookingsRelations = relations(bookings, ({ one }) => ({
  clinic: one(clinics, {
    fields: [bookings.clinicId],
    references: [clinics.id],
  }),
}))

export const datesUnavailable = mysqlTable("datesUnavailable", {
  id: serial("id").primaryKey(),
  date: datetime("date").notNull(),
  clinicId: int("clinicId").notNull(),
  createdAt: timestamp("createdAt").defaultNow(),
})

export const datesUnavailableRelations = relations(
  datesUnavailable,
  ({ one }) => ({
    clinic: one(clinics, {
      fields: [datesUnavailable.clinicId],
      references: [clinics.id],
    }),
  })
)

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
