"use server"

import { revalidatePath } from "next/cache"
import { db } from "@/db"
import { clinics } from "@/db/schema"
import type { clinicSchema } from "@/validations/clinic"
import { eq } from "drizzle-orm"
import type { z } from "zod"

export async function checkIfClinicExists(userId: string) {
  const alreadyExists = await db.query.clinics.findFirst({
    where: eq(clinics.userId, userId),
  })

  return alreadyExists !== null
}

export async function addClinic(
  input: z.infer<typeof clinicSchema> & { userId: string }
) {
  await db.insert(clinics).values({
    userId: input.userId,
    latitude: input.latitude,
    longitude: input.longitude,
    address: input.address,
    phone: input.phone,
    email: input.email,
  })

  revalidatePath("/admin/przychodnia")
}

export async function getClinic(userId: string) {
  const clinic = await db.query.clinics.findFirst({
    where: eq(clinics.userId, userId),
  })

  return clinic
}

export async function updateClinic(
  input: z.infer<typeof clinicSchema> & { userId: string }
) {
  await db
    .update(clinics)
    .set({
      userId: input.userId,
      latitude: input.latitude,
      longitude: input.longitude,
      address: input.address,
      phone: input.phone,
      email: input.email,
    })
    .where(eq(clinics.userId, input.userId))

  revalidatePath("/admin/przychodnia")
}
