import type { Metadata } from "next"
import { redirect } from "next/navigation"
import { getClinic } from "@/actions/clinic"
import { auth } from "@/auth"
import { env } from "@/env.mjs"

import { DEFAULT_UNAUTHENTICATED_REDIRECT } from "@/config/defaults"
import { ClinicUpdateForm } from "@/components/forms/clinic/clinic-update-form"
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header"
import { Shell } from "@/components/shells/shell"

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
  title: "Przychodnia",
  description: "Zarządzaj danymi przychodni",
}

export default async function ClinicPage(): Promise<JSX.Element> {
  const session = await auth()
  if (!session) redirect(DEFAULT_UNAUTHENTICATED_REDIRECT)

  const clinic = await getClinic()

  return (
    <Shell variant="sidebar">
      <PageHeader className="my-8">
        <PageHeaderHeading size="sm">Przychodnia</PageHeaderHeading>
        <PageHeaderDescription size="sm">
          Zarządzanie danymi przychodni
        </PageHeaderDescription>
      </PageHeader>
      <div className="w-full overflow-hidden">
        <ClinicUpdateForm clinic={clinic} />
      </div>
    </Shell>
  )
}
