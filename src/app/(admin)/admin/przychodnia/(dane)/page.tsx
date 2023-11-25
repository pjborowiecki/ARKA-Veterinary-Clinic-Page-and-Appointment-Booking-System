import type { Metadata } from "next"
import { redirect } from "next/navigation"
import { addClinic, checkIfClinicExists, getClinic } from "@/actions/clinic"
import { env } from "@/env.mjs"

import { getCurrentUser } from "@/lib/auth"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { ClinicUpdateForm } from "@/components/forms/clinic/clinic-update-form"

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
  title: "Zarządzanie przychodnią",
  description: "Zarządzaj danymi, dostępnością i rezerwacjami przychodni",
}

export default async function ClinicDataPage(): Promise<JSX.Element> {
  const user = await getCurrentUser()
  if (!user) redirect("/logowanie")

  const clinicExists = await checkIfClinicExists(user.id)

  if (!clinicExists) {
    try {
      await addClinic({
        userId: user.id,
        latitude: "49.963502626301796",
        longitude: "20.41957162751482",
        address: "Brodzińskiego 2, 32-700 Bochnia",
        phone: "146116499",
        email: "pjborowiecki@gmail.com",
      })
    } catch (error) {
      // TODO
      console.error(error)
    }
  }

  const clinic = await getClinic(user.id)

  return (
    <Card as="section">
      <CardHeader className="my-2">
        <CardTitle className="text-2xl">Dane kontaktowe</CardTitle>
        <CardDescription>Aktualizuj dane przychodni</CardDescription>
      </CardHeader>
      <CardContent>
        {user && clinic ? (
          <ClinicUpdateForm clinic={clinic} userId={user.id} />
        ) : (
          // TODO
          <p>Wczytywanie...</p>
        )}
      </CardContent>
    </Card>
  )
}
