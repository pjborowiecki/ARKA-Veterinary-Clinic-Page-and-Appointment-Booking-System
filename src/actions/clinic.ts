"use server"

import { revalidatePath } from "next/cache"
import { db } from "@/db"
import { clinics } from "@/db/schema"
import { eq } from "drizzle-orm"
import type { z } from "zod"

import type { clinicSchema } from "@/lib/validations/clinic"

export async function addClinicAction(
  input: z.infer<typeof clinicSchema> & { userId: string }
) {
  const alreadyExists = await db.query.clinics.findFirst({
    where: eq(clinics.userId, input.userId),
  })

  if (alreadyExists) {
    throw new Error("Klinika już istnieje")
  }

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

export async function updateClinicAction(
  input: z.infer<typeof clinicSchema> & { userId: string }
) {
  const correctId = await db.query.clinics.findFirst({
    where: eq(clinics.id, 1),
  })

  if (!correctId) {
    throw new Error("Klinika o podanym id nie istnieje")
  }

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
    .where(eq(clinics.id, 1))

  revalidatePath("/admin/przychodnia")
}
