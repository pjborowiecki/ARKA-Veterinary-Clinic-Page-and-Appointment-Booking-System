"use server"

import crypto from "crypto"
import { getUserByEmail, getUserByResetPasswordToken } from "@/actions/user"
import { signIn } from "@/auth"
import { db } from "@/db"
import { users, type NewUser } from "@/db/schema"
import { env } from "@/env.mjs"
import {
  passwordResetSchema,
  passwordUpdateSchemaExtended,
  signInWithPasswordSchema,
  signUpWithPasswordSchema,
  type PasswordResetFormInput,
  type PasswordUpdateFormInputExtended,
  type SignInWithPasswordFormInput,
  type SignUpWithPasswordFormInput,
} from "@/validations/auth"
import bcryptjs from "bcryptjs"
import { eq } from "drizzle-orm"
import { AuthError } from "next-auth"

import { resend } from "@/config/email"
import { EmailVerificationEmail } from "@/components/emails/auth/email-verification-email"
import { ResetPasswordEmail } from "@/components/emails/auth/reset-password-email"

export async function signUpWithPassword(
  rawInput: SignUpWithPasswordFormInput
): Promise<"invalid-input" | "exists" | "success" | "error"> {
  const validatedInput = signUpWithPasswordSchema.safeParse(rawInput)
  if (!validatedInput.success) return "invalid-input"

  try {
    const user = await getUserByEmail(validatedInput.data.email)
    if (user) return "exists"

    const passwordHash = await bcryptjs.hash(validatedInput.data.password, 10)

    // TODO: Replace with prepared statement
    const newUserResponse = await db.insert(users).values({
      id: crypto.randomUUID(),
      email: validatedInput.data.email,
      passwordHash,
    } as NewUser)

    if (!newUserResponse) return "error"

    const emailVerificationToken = crypto.randomBytes(32).toString("base64url")

    // TODO: Replace with prepared statement
    const updatedUserResponse = await db
      .update(users)
      .set({ emailVerificationToken })
      .where(eq(users.email, validatedInput.data.email))

    const emailSent = await resend.emails.send({
      from: env.RESEND_EMAIL_FROM,
      to: [validatedInput.data.email],
      subject: "Verify your email address",
      react: EmailVerificationEmail({
        email: validatedInput.data.email,
        emailVerificationToken,
      }),
    })

    return updatedUserResponse && emailSent ? "success" : "error"
  } catch (error) {
    console.error(error)
    throw new Error("Error signing up with password")
  }
}

export async function signInWithPassword(
  rawInput: SignInWithPasswordFormInput
): Promise<
  | "invalid-input"
  | "invalid-credentials"
  | "not-registered"
  | "unverified-email"
  | "success"
> {
  const validatedInput = signInWithPasswordSchema.safeParse(rawInput)
  if (!validatedInput.success) return "invalid-input"

  const existingUser = await getUserByEmail(validatedInput.data.email)
  if (!existingUser) return "not-registered"

  if (!existingUser.emailVerified) return "unverified-email"

  try {
    await signIn("credentials", {
      email: validatedInput.data.email,
      password: validatedInput.data.password,
      redirect: false,
    })

    return "success"
  } catch (error) {
    console.error(error)
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "invalid-credentials"
        default:
          throw error
      }
    } else {
      throw new Error("Error signing in with password")
    }
  }
}

export async function resetPassword(
  rawInput: PasswordResetFormInput
): Promise<"invalid-input" | "not-found" | "success" | "error"> {
  const validatedInput = passwordResetSchema.safeParse(rawInput)
  if (!validatedInput.success) return "invalid-input"

  const user = await getUserByEmail(validatedInput.data.email)
  if (!user) return "not-found"

  const today = new Date()
  const resetPasswordToken = crypto.randomBytes(32).toString("base64url")
  const resetPasswordTokenExpiry = new Date(today.setDate(today.getDate() + 1)) // 24 hours from now

  try {
    // TODO: Replace with prepared statement
    const userUpdatedResponse = await db
      .update(users)
      .set({
        resetPasswordToken,
        resetPasswordTokenExpiry,
      })
      .where(eq(users.email, validatedInput.data.email))

    const emailSent = await resend.emails.send({
      from: env.RESEND_EMAIL_FROM,
      to: [validatedInput.data.email],
      subject: "Resetowanie hasła",
      react: ResetPasswordEmail({
        email: validatedInput.data.email,
        resetPasswordToken,
      }),
    })

    return userUpdatedResponse && emailSent ? "success" : "error"
  } catch (error) {
    console.error(error)
    throw new Error("Error resetting password")
  }
}

export async function updatePassword(
  rawInput: PasswordUpdateFormInputExtended
): Promise<"invalid-input" | "not-found" | "expired" | "success" | "error"> {
  const validatedInput = passwordUpdateSchemaExtended.safeParse(rawInput)
  if (
    !validatedInput.success ||
    validatedInput.data.password !== validatedInput.data.confirmPassword
  )
    return "invalid-input"

  try {
    const user = await getUserByResetPasswordToken(
      validatedInput.data.resetPasswordToken
    )
    if (!user) return "not-found"

    const resetPasswordExpiry = user.resetPasswordTokenExpiry
    if (!resetPasswordExpiry || resetPasswordExpiry < new Date())
      return "expired"

    const passwordHash = await bcryptjs.hash(validatedInput.data.password, 10)

    // TODO: Replace with prepared statement
    const userUpdatedResponse = await db
      .update(users)
      .set({
        passwordHash,
        resetPasswordToken: null,
        resetPasswordTokenExpiry: null,
      })
      .where(eq(users.id, user.id))

    return userUpdatedResponse ? "success" : "error"
  } catch (error) {
    console.error(error)
    throw new Error("Error updating password")
  }
}