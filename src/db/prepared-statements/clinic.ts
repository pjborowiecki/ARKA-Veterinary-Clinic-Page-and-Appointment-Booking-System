import { eq, sql } from "drizzle-orm"

import { db } from "@/config/db"
import { businessHours, clinics, datesUnavailable } from "@/db/schema"

export const psGetClinic = db.select().from(clinics).prepare("psGetClinic")

export const psGetBusinessHours = db
  .select()
  .from(businessHours)
  .prepare("psGetBusinessHours")

export const psGetDatesUnavailable = db
  .select()
  .from(datesUnavailable)
  .prepare("psGetDatesUnavailable")

export const psCheckIfClinicExists = db.query.clinics
  .findFirst({
    columns: {
      id: true,
    },
    where: eq(clinics.id, sql.placeholder("id")),
  })
  .prepare("psCheckIfClinicExists")
