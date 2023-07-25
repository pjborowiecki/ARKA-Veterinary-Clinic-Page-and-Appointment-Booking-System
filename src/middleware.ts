import { NextResponse } from "next/server"
import type { UserRole } from "@/types"
import { clerkClient } from "@clerk/nextjs"
import { authMiddleware } from "@clerk/nextjs/server"

export default authMiddleware({
  publicRoutes: [
    "/",
    "/signin(.*)",
    "/signup(.*)",
    "/sso-callback(.*)",
    "/api(.*)",
  ],
  async afterAuth(auth, req) {
    if (auth.isPublicRoute) {
      return NextResponse.next()
    }

    const url = new URL(req.nextUrl.origin)

    if (!auth.userId) {
      url.pathname = "/signin"
      return NextResponse.redirect(url)
    }

    const user = await clerkClient.users.getUser(auth.userId)

    if (!user) {
      throw new Error("Nie ma takiego użytkownika")
    }

    if (!user.privateMetadata.role) {
      await clerkClient.users.updateUserMetadata(auth.userId, {
        privateMetadata: {
          role: "user" satisfies UserRole,
        },
      })
    }
  },
})

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api)(.*)"],
}
