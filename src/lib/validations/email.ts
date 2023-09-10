import * as z from "zod"

export const enquiryEmailSchema = z.object({
  firstName: z.string().min(1, { message: "Pole jest wymagane" }),
  lastName: z.string().min(1, { message: "Pole jest wymagane" }),
  email: z.string().email({ message: "Nieprawidłowy adres email" }),
  phone: z.string(),
  message: z.string().optional(),
  rodo: z.boolean().default(true),
})

export const enquiryEmailNotificationSchema = z.object({})

export const bookingConfirmationEmailSchema = z.object({})

export const bookingCancellationEmailSchema = z.object({})

export const bookingRejectionEmailSchema = z.object({})
