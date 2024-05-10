import type { Metadata } from "next"
import { redirect } from "next/navigation"

import { env } from "@/env.mjs"
import { DEFAULT_UNAUTHENTICATED_REDIRECT } from "@/config/defaults"

import auth from "@/lib/auth"

import { UserUpdateForm } from "@/components/forms/auth/user-update-form"
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

export default async function ProfilePage(): Promise<JSX.Element> {
  const session = await auth()
  if (!session) redirect(DEFAULT_UNAUTHENTICATED_REDIRECT)

  return (
    <Shell variant="sidebar">
      <PageHeader className="my-8">
        <PageHeaderHeading size="sm">Profil</PageHeaderHeading>
        <PageHeaderDescription size="sm">
          Zarządzanie danymi administratora
        </PageHeaderDescription>
      </PageHeader>
      <div className="w-full overflow-hidden">
        <UserUpdateForm />
      </div>
    </Shell>
  )
}
