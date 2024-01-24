"use server"

import crypto from "crypto"
import { unstable_noStore as noStore } from "next/cache"
import { getUserByEmail } from "@/actions/user"
import { db } from "@/db"
import { users } from "@/db/schema"
import { env } from "@/env.mjs"
import { eq } from "drizzle-orm"

import { resend } from "@/config/email"
import { EmailVerificationEmail } from "@/components/emails/auth/email-verification-email"
import { EnquiryNotificationForArkaEmail } from "@/components/emails/contact/enquiry-notification-for-arka-email"
import { EnquiryNotificationForCustomerEmail } from "@/components/emails/contact/enquiry-notification-for-customer-email"

export async function resendEmailVerificationLink(
  email: string
): Promise<"not-found" | "success" | null> {
  try {
    const user = await getUserByEmail(email)
    if (!user) return "not-found"

    const emailVerificationToken = crypto.randomBytes(32).toString("base64url")

    // TODO: Replace with prepared statement
    const userUpdated = await db
      .update(users)
      .set({ emailVerificationToken })
      .where(eq(users.email, email))

    const emailSent = await resend.emails.send({
      from: env.RESEND_EMAIL_FROM,
      to: [email],
      subject: "Zweryfikuj swój adres email",
      react: EmailVerificationEmail({ email, emailVerificationToken }),
    })

    return userUpdated && emailSent ? "success" : null
  } catch (error) {
    console.error(error)
    throw new Error(
      "Błąd przy wysyłaniu linka weryfikacyjnego. Wiadomość nie została wysłana"
    )
  }
}

export async function checkIfEmailVerified(email: string): Promise<boolean> {
  try {
    noStore()
    const user = await getUserByEmail(email)
    return user?.emailVerified instanceof Date ? true : false
  } catch (error) {
    console.error(error)
    throw new Error("Błąd przy sprawdzaniu czy email został już zweryfikowany")
  }
}

export async function markEmailAsVerified(
  emailVerificationToken: string
): Promise<boolean> {
  try {
    // TODO: replace with prepared statement
    const userUpdated = await db
      .update(users)
      .set({
        emailVerified: new Date(),
        emailVerificationToken: null,
      })
      .where(eq(users.emailVerificationToken, emailVerificationToken))

    return userUpdated ? true : false
  } catch (error) {
    console.error(error)
    throw new Error("Błąd przy oznaczaniu email jako zweryfikowany")
  }
}

export async function submitContactForm(formData: {
  email: string
  name: string
  message: string
}): Promise<"success" | null> {
  try {
    // TODO
    const emailToArkaSent = await resend.emails.send({
      from: env.RESEND_EMAIL_FROM,
      to: env.RESEND_EMAIL_TO,
      subject:
        "Świetna wiadomość! Nowe zapytanie z formularza kontaktowego na stronie",
      react: EnquiryNotificationForArkaEmail({
        name: formData.name,
        email: formData.email,
        message: formData.message,
      }),
    })

    // TODO
    const emailToCustomerSent = await resend.emails.send({
      from: env.RESEND_EMAIL_FROM,
      to: env.RESEND_EMAIL_TO,
      subject: "Dziękujemy! Otrzymaliśmy Twoje zapytanie",
      react: EnquiryNotificationForCustomerEmail({
        name: formData.name,
        email: formData.email,
        message: formData.message,
      }),
    })

    return emailToArkaSent && emailToCustomerSent ? "success" : null
  } catch (error) {
    console.error(error)
    throw new Error(
      "Błąd przy przesyłaniu formularza kontaktowego. Formularz nie został wysłany"
    )
  }
}
