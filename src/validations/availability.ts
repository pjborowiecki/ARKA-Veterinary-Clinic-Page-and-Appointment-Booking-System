import * as z from "zod"

export const hourSchema = z
  .string({
    required_error: "Podaj godzinę otwarcia",
    invalid_type_error: "Nieprawidłowy typ danych",
  })
  .regex(/^(?:[01]\d|2[0-3]):[0-5]\d$/, {
    message: "Nieprawidłowy format godziny. Poprawny format to HH:MM",
  })

export const statusSchema = z
  .enum(["otwarte", "zamknięte"], {
    required_error: "Wybierz status",
    invalid_type_error: "Nieprawidłowy typ danych",
  })
  .default("otwarte")

export const businessHoursIdSchema = z
  .string({
    required_error: "Id jest wymagane",
    invalid_type_error: "Dane wejściowe muszą być tekstem",
  })
  .min(1, {
    message: "Id musi mieć przynajmniej 1 znak",
  })
  .max(128, {
    message: "Id może mieć maksymalnie 32 znaki",
  })

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

export const addBusinessHoursSchema = businessHoursSchema

export const updateBusinessHoursSchema = businessHoursSchema.extend({
  id: businessHoursIdSchema,
})

export type AddBusinessHoursInput = z.infer<typeof addBusinessHoursSchema>

export type UpdateBusinessHoursInput = z.infer<typeof updateBusinessHoursSchema>
