import { env } from "@/env.mjs"
import type { ErrorResponse } from "resend"
import { z } from "zod"

import { resend } from "@/lib/resend"
import { enquiryEmailSchema } from "@/lib/validations/email"
import EnquiryNotificationForArka from "@/components/emails/enquiry-notification-for-arka"
import EnquiryNotificationForCustomer from "@/components/emails/enquiry-notification-for-customer"

export async function POST(req: Request) {
  const input = enquiryEmailSchema.parse(await req.json())

  try {
    // Email to ARKA
    await resend.emails.send({
      from: env.EMAIL_FROM_ADDRESS,
      to: env.EMAIL_TO_ADDRESS,
      subject: "Nowe zapytanie",
      react: EnquiryNotificationForArka({
        name: input.name,
        surname: input.surname,
        email: input.email,
        phone: input.phone,
        message: input.message,
      }),
    })

    // Email to customer
    // await resend.emails.send({})

    // Response
    return new Response(null, { status: 200 })
  } catch (error) {
    console.error(error)

    if (error instanceof z.ZodError) {
      return new Response(error.message, { status: 422 })
    }

    const resendError = error as ErrorResponse

    if (resendError?.error?.message) {
      return new Response(resendError.error.message, { status: 429 })
    }

    if (error instanceof Error) {
      return new Response(error.message, { status: 500 })
    }

    return new Response("Coś poszło nie tak. Spróbuj ponownie", { status: 500 })
  }
}
