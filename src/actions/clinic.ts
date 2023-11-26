"use server"

import { revalidatePath } from "next/cache"
import { db } from "@/db"
import { psGetClinic } from "@/db/prepared/statements"
import { clinics, type Clinic } from "@/db/schema"
import type { clinicSchema } from "@/validations/clinic"
import { eq } from "drizzle-orm"
import type { z } from "zod"

export async function addClinic(
  input: z.infer<typeof clinicSchema>
): Promise<string> {
  try {
    const response = await db.insert(clinics).values({
      latitude: input.latitude,
      longitude: input.longitude,
      address: input.address,
      phone_1: input.phone_1,
      phone_2: input.phone_2,
      email: input.email,
    })

    // revalidatePath("/admin/przychodnia")

    return response ? "success" : "fail"
  } catch (error) {
    console.error(error)
    throw new Error("Błąd przy dodawaniu nowej kliniki")
  }
}

export async function getClinic(): Promise<Clinic | null> {
  try {
    let [clinic] = await psGetClinic.execute()

    if (!clinic) {
      const response = await addClinic({
        latitude: "49.963502626301796",
        longitude: "20.41957162751482",
        address: "Brodzińskiego 2, 32-700 Bochnia",
        phone_1: "14 61 16 499",
        phone_2: "501 01 45 54",
        email: "pjborowiecki@poutlook.com",
      })

      if (response === "success") {
        ;[clinic] = await psGetClinic.execute()
      }
    }

    return clinic || null
  } catch (error) {
    console.error(error)
    throw new Error("Błąd wczytywania danych przychodni")
  }
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
