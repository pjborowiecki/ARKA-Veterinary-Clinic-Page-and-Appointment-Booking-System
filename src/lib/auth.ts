import { type User } from "next-auth"
import { getServerSession } from "next-auth/next"

import { authOptions } from "@/config/auth"

export async function getCurrentUser(): Promise<User | undefined> {
  const session = await getServerSession(authOptions)
  return session?.user
}
