import { sendEmail } from "@/actions/email"
import { getUserByEmail } from "@/actions/user"
import { db } from "@/db"
import { env } from "@/env.mjs"
import { DrizzleAdapter } from "@auth/drizzle-adapter"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import type { Account, AuthOptions, Profile, Session, User } from "next-auth"
import { type JWT } from "next-auth/jwt"
import CredentialsProvider from "next-auth/providers/credentials"

export const authOptions: AuthOptions = {
  adapter: DrizzleAdapter(db),
  debug: env.NODE_ENV === "development",
  secret: env.AUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 daysd
    updateAge: 24 * 60 * 60, // 24 hours
  },
  pages: {
    signIn: "/signin",
    signOut: "/signout",
    verifyRequest: "/signin/magic-link-signin",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        if (!credentials) return null

        const user = await getUserByEmail(credentials.email)
        if (!user) return null

        const passwordIsValid = await bcrypt.compare(
          credentials.password,
          String(user.passwordHash)
        )

        return passwordIsValid ? user : null
      },
    }),
  ],
  jwt: {
    encode({ secret, token }) {
      if (!token) throw new Error("No token to encode")
      return jwt.sign(token, secret)
    },
    decode({ secret, token }) {
      if (!token) throw new Error("No token to decode")

      const decodedToken = jwt.verify(token, secret)
      return typeof decodedToken === "string"
        ? (JSON.parse(decodedToken) as JWT)
        : decodedToken
    },
  },
  callbacks: {
    jwt(params: {
      token: JWT
      user?: User | undefined
      account?: Account | null | undefined
      profile?: Profile | undefined
      isNewUser?: boolean | undefined
    }) {
      if (params.user) {
        params.token.email = params.user.email
        params.token.id = params.user?.id
      }

      return params.token
    },
    session(params: { session: Session; token: JWT; user: User }) {
      if (params.session.user) {
        params.session.user.email = params.token.email
        params.session.user.id = params.token.id as string
      }

      return params.session
    },
  },
}
