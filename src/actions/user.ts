"use server"

import { unstable_noStore as noStore } from "next/cache"

import {
  psCheckIfUserExists,
  psGetUserByEmail,
  psGetUserByEmailVerificationToken,
  psGetUserById,
  psGetUserByResetPasswordToken,
} from "@/db/prepared-statements/user"
import type { User } from "@/db/schema/index"
import {
  checkIfUserExistsSchema,
  getUserByEmailSchema,
  getUserByEmailVerificationTokenSchema,
  getUserByIdSchema,
  getUserByResetPasswordTokenSchema,
  type CheckIfUserExistsInput,
  type GetUserByEmailInput,
  type GetUserByEmailVerificationTokenInput,
  type GetUserByIdInput,
  type GetUserByResetPasswordTokenInput,
} from "@/validations/user"

export async function getUserById(
  rawInput: GetUserByIdInput
): Promise<User | null> {
  try {
    const validatedInput = getUserByIdSchema.safeParse(rawInput)
    if (!validatedInput.success) return null

    noStore()
    const [user] = await psGetUserById.execute({ id: validatedInput.data.id })
    return user || null
  } catch (error) {
    console.error(error)
    throw new Error("Error getting user by id")
  }
}

export async function getUserByEmail(
  rawInput: GetUserByEmailInput
): Promise<User | null> {
  try {
    const validatedInput = getUserByEmailSchema.safeParse(rawInput)
    if (!validatedInput.success) return null

    noStore()
    const [user] = await psGetUserByEmail.execute({
      email: validatedInput.data.email,
    })
    return user || null
  } catch (error) {
    console.error(error)
    throw new Error("Error getting user by email")
  }
}

export async function getUserByResetPasswordToken(
  rawInput: GetUserByResetPasswordTokenInput
): Promise<User | null> {
  try {
    const validatedInput = getUserByResetPasswordTokenSchema.safeParse(rawInput)
    if (!validatedInput.success) return null

    noStore()
    const [user] = await psGetUserByResetPasswordToken.execute({
      resetPasswordToken: validatedInput.data.token,
    })
    return user || null
  } catch (error) {
    console.error(error)
    throw new Error("Error getting user by reset password token")
  }
}

export async function getUserByEmailVerificationToken(
  rawInput: GetUserByEmailVerificationTokenInput
): Promise<User | null> {
  try {
    const validatedInput =
      getUserByEmailVerificationTokenSchema.safeParse(rawInput)
    if (!validatedInput.success) return null

    noStore()
    const [user] = await psGetUserByEmailVerificationToken.execute({
      emailVerificationToken: validatedInput.data.token,
    })
    return user || null
  } catch (error) {
    console.error(error)
    throw new Error("Error getting user by email verification token")
  }
}

export async function checkIfUserExists(
  rawInput: CheckIfUserExistsInput
): Promise<"invalid-input" | boolean> {
  try {
    const validatedInput = checkIfUserExistsSchema.safeParse(rawInput)
    if (!validatedInput.success) return "invalid-input"

    noStore()
    const exists = await psCheckIfUserExists.execute({
      id: validatedInput.data.id,
    })

    return exists ? true : false
  } catch (error) {
    console.error(error)
    throw new Error("Error checking if user exists")
  }
}
