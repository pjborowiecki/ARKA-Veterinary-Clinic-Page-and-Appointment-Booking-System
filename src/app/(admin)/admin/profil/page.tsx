import type { Metadata } from "next"
import { redirect } from "next/navigation"
import { env } from "@/env.mjs"
import { currentUser } from "@clerk/nextjs"

import { UserProfile } from "@/components/auth/user-profile"
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header"
import { Shell } from "@/components/shells/shell"

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
  title: "Profil",
  description: "Zarządzaj danymi administratora",
}

export default async function ProfilePage() {
  const user = await currentUser()

  if (!user) {
    redirect("/")
  }

  return (
    <Shell variant="sidebar">
      <PageHeader className="my-8">
        <PageHeaderHeading size="sm">Profil</PageHeaderHeading>
        <PageHeaderDescription size="sm">
          Zarządzanie danymi administratora
        </PageHeaderDescription>
      </PageHeader>
      <div className="w-full overflow-hidden">
        <UserProfile />
      </div>
    </Shell>
  )
}
