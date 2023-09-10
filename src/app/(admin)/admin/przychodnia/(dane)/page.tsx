import type { Metadata } from "next"
import { redirect } from "next/navigation"
import { addClinicAction } from "@/actions/clinic"
import { db } from "@/db"
import { clinics } from "@/db/schema"
import { env } from "@/env.mjs"
import { currentUser } from "@clerk/nextjs"
import { eq } from "drizzle-orm"

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
  title: "Zarządzanie placówką",
  description: "Zarządzaj danymi, dostępnością i rezerwacjami przychodni",
}

export default async function ClinicDataPage() {
  const user = await currentUser()

  if (!user) {
    redirect("/logowanie")
  }

  const allClinics = await db.query.clinics.findMany({
    where: eq(clinics.userId, user.id),
  })

  if (!allClinics || allClinics.length === 0) {
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

  const clinic = await db.query.clinics.findFirst({
    where: eq(clinics.userId, user.id),
  })

  return (
    <div>
      <Card as="section">
        <CardHeader className="my-2">
          <CardTitle className="text-2xl">Dane przychodni</CardTitle>
          <CardDescription>Aktualizacja danych przychodni</CardDescription>
        </CardHeader>
        <CardContent>
          {clinic && <UpdateClinicForm clinic={clinic} userId={user.id} />}
        </CardContent>
      </Card>
    </div>
  )
}
