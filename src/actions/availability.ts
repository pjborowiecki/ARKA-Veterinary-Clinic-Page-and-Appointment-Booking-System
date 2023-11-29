"use server"

// import { revalidatePath } from "next/cache"
import { db } from "@/db"
import {
  psGetBusinessHours,
  psGetDatesUnavailable,
} from "@/db/prepared/statements"
import {
  businessHours,
  type BusinessHours,
  type DateUnavailable,
} from "@/db/schema"
import type { businessHoursSchema } from "@/validations/availability"
import type { z } from "zod"

export async function addBusinessHours(
  input: z.infer<typeof businessHoursSchema>
): Promise<"success" | "fail"> {
  try {
    const response = await db.insert(businessHours).values({
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

    // revalidatePath("/admin/przychodnia/godziny")
    // revalidatePath("/")

    return response ? "success" : "fail"
  } catch (error) {
    console.error(error)
    throw new Error("Błąd przy dodawaniu godzin przyjęć")
  }
}

export async function getBusinessHours(): Promise<BusinessHours | null> {
  try {
    let [businessHours] = await psGetBusinessHours.execute()

    if (!businessHours) {
      const response = await addBusinessHours({
        mondayStatus: "otwarte",
        tuesdayStatus: "otwarte",
        wednesdayStatus: "otwarte",
        thursdayStatus: "otwarte",
        fridayStatus: "otwarte",
        saturdayStatus: "otwarte",
        sundayStatus: "zamknięte",
        mondayOpening: "08:00",
        tuesdayOpening: "08:00",
        wednesdayOpening: "08:00",
        thursdayOpening: "08:00",
        fridayOpening: "08:00",
        saturdayOpening: "08:00",
        sundayOpening: "08:00",
        mondayClosing: "17:00",
        tuesdayClosing: "17:00",
        wednesdayClosing: "17:00",
        thursdayClosing: "17:00",
        fridayClosing: "17:00",
        saturdayClosing: "13:00",
        sundayClosing: "13:00",
      })

      if (response === "success") {
        ;[businessHours] = await psGetBusinessHours.execute()
      }
    }

    return businessHours || null
  } catch (error) {
    console.error(error)
    throw new Error("Błąd przy pobieraniu godzin przyjęć")
  }
}

export async function updateBusinessHours(
  input: z.infer<typeof businessHoursSchema>
): Promise<"success" | "fail"> {
  try {
    const response = await db.update(businessHours).set({
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

    return response ? "success" : "fail"
    // revalidatePath("/admin/przychodnia/godziny")
  } catch (error) {
    console.error(error)
    throw new Error("Błąd przy aktualizacji godzin przyjęć")
  }
}

export async function getDatesUnavailable(): Promise<DateUnavailable[] | null> {
  try {
    const datesUnavailable = await psGetDatesUnavailable.execute()
    return datesUnavailable || null
  } catch (error) {
    console.error()
    throw new Error("Błąd wczytywania niedostępnych terminów")
  }
}

export async function getDatesUnavailableAsAnArrayOfDates(): Promise<Date[]> {
  try {
    const datesUnavailableObjects = await psGetDatesUnavailable.execute()
    if (!datesUnavailableObjects) return []

    const datesUnavailable = datesUnavailableObjects.map(
      (dateUnavailable) => new Date(dateUnavailable.date)
    )

    return datesUnavailable || []
  } catch (error) {
    console.error()
    throw new Error("Błąd wczytywania niedostępnych terminów")
  }
}

export async function addDateUnavailable() {}

export async function updateDateUnavailable() {}

export async function deleteDateUnavailable() {}
