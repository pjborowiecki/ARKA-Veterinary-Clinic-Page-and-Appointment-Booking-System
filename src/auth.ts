import { db } from "@/db"
import { env } from "@/env.mjs"
import { DrizzleAdapter } from "@auth/drizzle-adapter"
import NextAuth from "next-auth"

import authConfig from "@/config/auth"

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  debug: env.NODE_ENV === "development",
  pages: {
    signIn: "/logowanie",
    signOut: "/signout",
    verifyRequest: "/logowanie/magic-link-signin",
  },
  secret: env.AUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
    updateAge: 24 * 60 * 60, // 24 hours
  },
  callbacks: {},
  adapter: DrizzleAdapter(db),
  ...authConfig,
})
