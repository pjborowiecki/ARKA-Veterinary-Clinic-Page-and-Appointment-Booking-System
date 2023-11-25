"use server"

import crypto from "crypto"
import { unstable_noStore as noStore } from "next/cache"
import { db } from "@/db"
import { users } from "@/db/schema"
import { env } from "@/env.mjs"
import { eq } from "drizzle-orm"
import {
  type CreateEmailOptions,
  type CreateEmailRequestOptions,
} from "resend/build/src/emails/interfaces"

import { resend } from "@/config/email"
import { EmailVerificationEmail } from "@/components/emails/auth/email-verification-email"
import { EnquiryNotificationForArkaEmail } from "@/components/emails/contact/enquiry-notification-for-arka-email"
import { EnquiryNotificationForCustomerEmail } from "@/components/emails/contact/enquiry-notification-for-customer-email"

import { getUserByEmail } from "./user"

export async function sendEmail(
  payload: CreateEmailOptions,
  options?: CreateEmailRequestOptions | undefined
) {
  try {
    const data = await resend.emails.send(payload, options)
    console.log("Email sent successfully")
    return data
  } catch (error) {
    console.error(error)
    throw new Error("Error sending email")
  }
}

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

    const emailSent = await sendEmail({
      from: env.RESEND_EMAIL_FROM,
      to: [email],
      subject: "Verify your email address",
      react: EmailVerificationEmail({ email, emailVerificationToken }),
    })

    return userUpdated && emailSent ? "success" : null
  } catch (error) {
    console.error(error)
    throw new Error("Error resending email verification link")
  }
}

export async function checkIfEmailVerified(email: string): Promise<boolean> {
  try {
    noStore()
    const user = await getUserByEmail(email)
    return user?.emailVerified instanceof Date ? true : false
  } catch (error) {
    console.error(error)
    throw new Error("Error checking if email verified")
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
    throw new Error("Error marking email as verified")
  }
}

export async function submitContactForm(formData: {
  email: string
  name: string
  message: string
}): Promise<"success" | null> {
  try {
    // TODO
    const emailToArkaSent = await sendEmail({
      from: env.EMAIL_FROM_ADDRESS,
      to: env.EMAIL_TO_ADDRESS,
      subject: "Exciting news! New enquiry awaits",
      react: EnquiryNotificationForArkaEmail({
        name: formData.name,
        email: formData.email,
        message: formData.message,
      }),
    })

    const emailToCustomerSent = await sendEmail({
      from: env.EMAIL_FROM_ADDRESS,
      to: env.EMAIL_TO_ADDRESS,
      subject: "Exciting news! New enquiry awaits",
      react: EnquiryNotificationForCustomerEmail({
        name: formData.name,
        email: formData.email,
        message: formData.message,
      }),
    })

    return emailToArkaSent && emailToCustomerSent ? "success" : null
  } catch (error) {
    console.error(error)
    throw new Error("Error submitting contact form")
  }
}
