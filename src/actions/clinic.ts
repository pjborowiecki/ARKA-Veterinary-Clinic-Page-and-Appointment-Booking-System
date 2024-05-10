"use server"

import { unstable_noStore as noStore, revalidatePath } from "next/cache"
import { eq } from "drizzle-orm"

import { db } from "@/config/db"
import {
  psCheckIfClinicExists,
  psGetClinic,
} from "@/db/prepared-statements/clinic"
import { clinics, type Clinic } from "@/db/schema"
import {
  addClinicSchema,
  checkIfClinicExistsSchema,
  updateClinicSchema,
  type AddClinicInput,
  type CheckIfClinicExistsInput,
  type UpdateClinicInput,
} from "@/validations/clinic"

import { generateId } from "@/lib/utils"

export async function addClinic(
  rawInput: AddClinicInput
): Promise<"invalid-input" | "error" | "success"> {
  try {
    const validatedInput = addClinicSchema.safeParse(rawInput)
    if (!validatedInput.success) return "invalid-input"

    const newClinic = await db
      .insert(clinics)
      .values({
        id: generateId(),
        latitude: validatedInput.data.latitude,
        longitude: validatedInput.data.longitude,
        address: validatedInput.data.address,
        phone_1: validatedInput.data.phone_1,
        phone_2: validatedInput.data.phone_2,
        email: validatedInput.data.email,
      })
      .returning()

    revalidatePath("/admin/przychodnia")
    revalidatePath("/")

    return newClinic ? "success" : "error"
  } catch (error) {
    console.error(error)
    throw new Error("Błąd przy dodawaniu nowej kliniki")
  }
}

export async function getClinic(): Promise<Clinic | null> {
  try {
    noStore()
    let [clinic] = await psGetClinic.execute()

    if (!clinic) {
      const newClinic = await db
        .insert(clinics)
        .values({
          id: generateId(),
          latitude: "49.963502626301796",
          longitude: "20.41957162751482",
          address: "Brodzińskiego 2, 32-700 Bochnia",
          phone_1: "14 61 16 499",
          phone_2: "501 01 45 54",
          email: "pjborowiecki@poutlook.com",
        })
        .returning()

      if (newClinic) {
        ;[clinic] = await psGetClinic.execute()
      }
    }

    return clinic || null
  } catch (error) {
    console.error(error)
    throw new Error("Błąd wczytywania danych przychodni")
  }
}

export async function checkIfClinicExists(
  rawInput: CheckIfClinicExistsInput
): Promise<"invalid-input" | boolean> {
  try {
    const validatedInput = checkIfClinicExistsSchema.safeParse(rawInput)
    if (!validatedInput.success) return "invalid-input"

    noStore()
    const exists = await psCheckIfClinicExists.execute({
      id: validatedInput.data.id,
    })

    return exists ? true : false
  } catch (error) {
    console.error(error)
    throw new Error("Error checking if clinic exists")
  }
}

export async function updateClinic(
  rawInput: UpdateClinicInput
): Promise<"invalid-input" | "not-found" | "error" | "success"> {
  try {
    const validatedInput = updateClinicSchema.safeParse(rawInput)
    if (!validatedInput.success) return "invalid-input"

    const exists = await checkIfClinicExists({ id: validatedInput.data.id })
    if (!exists || exists === "invalid-input") return "not-found"

    noStore()
    const clinicUpdated = await db
      .update(clinics)
      .set({
        latitude: validatedInput.data.latitude,
        longitude: validatedInput.data.longitude,
        address: validatedInput.data.address,
        phone_1: validatedInput.data.phone_1,
        phone_2: validatedInput.data.phone_2,
        email: validatedInput.data.email,
      })
      .where(eq(clinics.id, validatedInput.data.id))
      .returning()

    revalidatePath("/admin/przychodnia")
    revalidatePath("/")

    return clinicUpdated ? "success" : "error"
  } catch (error) {
    console.error(error)
    throw new Error("Błąd przy aktualizacji danych przychodni")
  }
}
