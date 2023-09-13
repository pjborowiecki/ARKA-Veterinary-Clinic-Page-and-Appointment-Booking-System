import { env } from "@/env.mjs"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { UpdateDatesUnavailableForm } from "@/components/forms/update-dates-unavailable-form"

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
  title: "Dni wolne",
  description: "Wybierz terminy, w których przychodnia będzie nieczynna",
}

export default function ClinicDatesUnavailablePage() {
  return (
    <Card as="section">
      <CardHeader className="my-2">
        <CardTitle className="text-2xl">Dni wolne</CardTitle>
        <CardDescription>
          Dni, w których przychodnia jest nieczynna
        </CardDescription>
      </CardHeader>
      <CardContent>
        {/* <UpdateDatesUnavailabileForm clinic={clinic} userId={user.id} /> */}
      </CardContent>
    </Card>
  )
}
