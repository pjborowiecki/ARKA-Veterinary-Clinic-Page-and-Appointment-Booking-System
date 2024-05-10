import type { Metadata } from "next"
import { redirect } from "next/navigation"
import { getBusinessHours } from "@/actions/availability"

import { env } from "@/env.mjs"
import { DEFAULT_UNAUTHENTICATED_REDIRECT } from "@/config/defaults"

import auth from "@/lib/auth"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { BusinessHoursUpdateForm } from "@/components/forms/clinic/business-hours-update-form"
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header"
import { Shell } from "@/components/shells/shell"

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
  title: "Dostępność",
  description: "Określaj dni i godziny przyjęć",
}

export default async function AvailabilityPage(): Promise<JSX.Element> {
  const session = await auth()
  if (!session) redirect(DEFAULT_UNAUTHENTICATED_REDIRECT)

  const currentBusinessHours = await getBusinessHours()

  return (
    <Shell variant="sidebar">
      <PageHeader className="my-8">
        <PageHeaderHeading size="sm">Dostępność</PageHeaderHeading>
        <PageHeaderDescription size="sm">
          Zarządzanie dostępnością
        </PageHeaderDescription>
      </PageHeader>
      <div className="flex flex-col gap-4 xl:flex-row">
        {/* Opening hours */}
        <Card className="w-full">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl">Godziny przyjęć</CardTitle>
            <CardDescription>
              Godziny, w których przyjmujesz klientów
            </CardDescription>
          </CardHeader>
          <CardContent>
            <BusinessHoursUpdateForm
              currentBusinessHours={currentBusinessHours}
            />
          </CardContent>
        </Card>

        {/* Days unavailable */}
        <Card className="w-full">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl">Dni wolne</CardTitle>
            <CardDescription>
              Dni, w których nie przyjmujesz klientów
            </CardDescription>
          </CardHeader>
          <CardContent>kalendarz i możliwość dodania dni wolnych</CardContent>
        </Card>
      </div>
    </Shell>
  )
}
