import type { Metadata } from "next"
import { redirect } from "next/navigation"
import {
  addClinicAction,
  checkIfClinicExistsAction,
  getClinicAction,
} from "@/actions/clinic"
import { env } from "@/env.mjs"
import { currentUser } from "@clerk/nextjs"

import { catchError } from "@/lib/utils"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { UpdateClinicForm } from "@/components/forms/update-clinic-form"

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
  title: "Zarządzanie przychodnią",
  description: "Zarządzaj danymi, dostępnością i rezerwacjami przychodni",
}

export default async function ClinicDataPage() {
  const user = await currentUser()

  if (!user) {
    redirect("/logowanie")
  }

  const clinicExists = await checkIfClinicExistsAction(user.id)

  if (!clinicExists) {
    try {
      await addClinicAction({
        userId: user.id,
        latitude: "49.963502626301796",
        longitude: "20.41957162751482",
        address: "Brodzińskiego 2, 32-700 Bochnia",
        phone: "146116499",
        email: "pjborowiecki@gmail.com",
      })
    } catch (error) {
      catchError(error)
    }
  }

  const clinic = await getClinicAction(user.id)

  return (
    <Card as="section">
      <CardHeader className="my-2">
        <CardTitle className="text-2xl">Dane kontaktowe</CardTitle>
        <CardDescription>Aktualizuj dane przychodni</CardDescription>
      </CardHeader>
      <CardContent>
        {user && clinic ? (
          <UpdateClinicForm clinic={clinic} userId={user.id} />
        ) : (
          <p>Wczytywanie...</p>
        )}
      </CardContent>
    </Card>
  )
}
