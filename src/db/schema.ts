import type { InferModel } from "drizzle-orm"
import {
  boolean,
  date,
  mysqlEnum,
  mysqlTable,
  serial,
  text,
  time,
  timestamp,
  varchar,
} from "drizzle-orm/mysql-core"

export const bookings = mysqlTable("bookings", {
  id: serial("id").primaryKey(),
  message: text("message"),
  type: mysqlEnum("type", ["weterynarz", "salon fryzur"])
    .notNull()
    .default("weterynarz"),
  date: date("date").notNull(),
  time: time("time", {}).notNull(),
  name: varchar("name", { length: 32 }).notNull(),
  surname: varchar("surname", { length: 32 }).notNull(),
  email: varchar("email", { length: 64 }).notNull(),
  phone: varchar("phone", { length: 16 }).notNull(),
  rodo: boolean("rodo").notNull().default(false),
  createdAt: timestamp("createdAt").defaultNow(),
})

export type Booking = InferModel<typeof bookings>
