"use server"

import { revalidatePath } from "next/cache"
import { db } from "@/db"
import { businessHours } from "@/db/schema"
import { and, eq } from "drizzle-orm"
import type { z } from "zod"

import type { businessHoursSchema } from "@/lib/validations/availability"

export async function checkIfBusinessHoursExistAction(
  userId: string,
  clinicId: number
) {
  return await db.query.businessHours.findFirst({
    where: and(
      eq(businessHours.userId, userId),
      eq(businessHours.clinicId, clinicId)
    ),
  })
}

export async function addBusinessHoursAction(
  input: z.infer<typeof businessHoursSchema> & {
    userId: string
    clinicId: number
  }
) {
  await db.insert(businessHours).values({
    userId: input.userId,
    clinicId: input.clinicId,
    mondayStatus: input.mondayStatus,
    tuesdayStatus: input.tuesdayStatus,
    wednesdayStatus: input.wednesdayStatus,
    thursdayStatus: input.thursdayStatus,
    fridayStatus: input.fridayStatus,
    saturdayStatus: input.saturdayStatus,
    sundayStatus: input.sundayStatus,
    mondayOpening: input.mondayOpening,
    tuesdayOpening: input.tuesdayOpening,
    wednesdayOpening: input.wednesdayOpening,
    thursdayOpening: input.thursdayOpening,
    fridayOpening: input.fridayOpening,
    saturdayOpening: input.saturdayOpening,
    sundayOpening: input.sundayOpening,
    mondayClosing: input.mondayClosing,
    tuesdayClosing: input.tuesdayClosing,
    wednesdayClosing: input.wednesdayClosing,
    thursdayClosing: input.thursdayClosing,
    fridayClosing: input.fridayClosing,
    saturdayClosing: input.saturdayClosing,
    sundayClosing: input.sundayClosing,
  })

  revalidatePath("/admin/przychodnia/godziny")
}

export async function getBusinessHoursAction() {
  return await db.query.businessHours.findFirst({
    where: eq(businessHours.id, 1),
  })
}

export async function updateBusinessHoursAction(
  input: z.infer<typeof businessHoursSchema> & {
    userId: string
    clinicId: number
  }
) {
  await db
    .update(businessHours)
    .set({
      userId: input.userId,
      clinicId: input.clinicId,
      mondayStatus: input.mondayStatus,
      tuesdayStatus: input.tuesdayStatus,
      wednesdayStatus: input.wednesdayStatus,
      thursdayStatus: input.thursdayStatus,
      fridayStatus: input.fridayStatus,
      saturdayStatus: input.saturdayStatus,
      sundayStatus: input.sundayStatus,
      mondayOpening: input.mondayOpening,
      tuesdayOpening: input.tuesdayOpening,
      wednesdayOpening: input.wednesdayOpening,
      thursdayOpening: input.thursdayOpening,
      fridayOpening: input.fridayOpening,
      saturdayOpening: input.saturdayOpening,
      sundayOpening: input.sundayOpening,
      mondayClosing: input.mondayClosing,
      tuesdayClosing: input.tuesdayClosing,
      wednesdayClosing: input.wednesdayClosing,
      thursdayClosing: input.thursdayClosing,
      fridayClosing: input.fridayClosing,
      saturdayClosing: input.saturdayClosing,
      sundayClosing: input.sundayClosing,
    })
    .where(
      and(
        eq(businessHours.userId, input.userId),
        eq(businessHours.clinicId, input.clinicId)
      )
    )

  revalidatePath("/admin/przychodnia/godziny")
}

export async function getDatesUnavailableAction() {}

export async function updateDatesUnavailableAction() {}

export async function deleteDatesUnavailableAction() {}
