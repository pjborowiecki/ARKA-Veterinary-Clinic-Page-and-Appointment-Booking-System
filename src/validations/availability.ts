import * as z from "zod"

export const hourSchema = z
  .string({
    required_error: "Podaj godzinę otwarcia",
    invalid_type_error: "Nieprawidłowy typ danych",
  })
  .regex(/^(?:[01]\d|2[0-3]):[0-5]\d$/, {
    message: "Nieprawidłowy format godziny. Poprawny format to HH:MM",
  })

const statusSchema = z
  .enum(["otwarte", "zamknięte"], {
    required_error: "Wybierz status",
    invalid_type_error: "Nieprawidłowy typ danych",
  })
  .default("otwarte")

export const businessHoursSchema = z.object({
  mondayStatus: statusSchema,
  tuesdayStatus: statusSchema,
  wednesdayStatus: statusSchema,
  thursdayStatus: statusSchema,
  fridayStatus: statusSchema,
  saturdayStatus: statusSchema,
  sundayStatus: statusSchema,
  mondayOpening: hourSchema,
  tuesdayOpening: hourSchema,
  wednesdayOpening: hourSchema,
  thursdayOpening: hourSchema,
  fridayOpening: hourSchema,
  saturdayOpening: hourSchema,
  sundayOpening: hourSchema,
  mondayClosing: hourSchema,
  tuesdayClosing: hourSchema,
  wednesdayClosing: hourSchema,
  thursdayClosing: hourSchema,
  fridayClosing: hourSchema,
  saturdayClosing: hourSchema,
  sundayClosing: hourSchema,
})
