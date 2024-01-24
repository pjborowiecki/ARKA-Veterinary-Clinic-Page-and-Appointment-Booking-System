import { getUserByEmail } from "@/actions/user"
import { signInWithPasswordSchema } from "@/validations/auth"
import bcryptjs from "bcryptjs"
import type { NextAuthConfig } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

export default {
  providers: [
    CredentialsProvider({
      async authorize(rawCredentials) {
        const validatedCredentials =
          signInWithPasswordSchema.safeParse(rawCredentials)

        if (validatedCredentials.success) {
          const user = await getUserByEmail(validatedCredentials.data.email)
          if (!user || !user.passwordHash) return null

          const passwordIsValid = await bcryptjs.compare(
            validatedCredentials.data.password,
            user.passwordHash
          )

          if (passwordIsValid) return user
        }
        return null
      },
    }),
  ],
} satisfies NextAuthConfig
