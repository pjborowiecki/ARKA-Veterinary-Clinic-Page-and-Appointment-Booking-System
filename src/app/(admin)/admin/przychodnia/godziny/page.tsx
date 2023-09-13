import type { Metadata } from "next"
import { notFound, redirect } from "next/navigation"
import {
  addBusinessHoursAction,
  checkIfBusinessHoursExistAction,
  getBusinessHoursAction,
} from "@/actions/availability"
import {
  addClinicAction,
  checkIfClinicExistsAction,
  getClinicAction,
} from "@/actions/clinic"
import { env } from "@/env.mjs"
import { currentUser } from "@clerk/nextjs"
import { toast } from "sonner"

import { catchError } from "@/lib/utils"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { UpdateBusinessHoursForm } from "@/components/forms/update-business-hours-form"

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
  title: "Godziny przyjeć",
  description: "Edytuj godziny pracy przychodni oraz dni wolne",
}

export default async function ClinicBusinessHoursPage() {
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

  if (!clinic) {
    notFound()
  } else {
    const businessHoursExist = await checkIfBusinessHoursExistAction(
      user.id,
      clinic.id
    )

    if (!businessHoursExist) {
      try {
        await addBusinessHoursAction({
          userId: user.id,
          clinicId: clinic.id,
          mondayStatus: "otwarte",
          tuesdayStatus: "otwarte",
          wednesdayStatus: "otwarte",
          thursdayStatus: "otwarte",
          fridayStatus: "otwarte",
          saturdayStatus: "otwarte",
          sundayStatus: "otwarte",
          mondayOpening: "09:00",
          tuesdayOpening: "09:00",
          wednesdayOpening: "09:00",
          thursdayOpening: "09:00",
          fridayOpening: "09:00",
          saturdayOpening: "09:00",
          sundayOpening: "09:00",
          mondayClosing: "17:00",
          tuesdayClosing: "17:00",
          wednesdayClosing: "17:00",
          thursdayClosing: "17:00",
          fridayClosing: "17:00",
          saturdayClosing: "17:00",
          sundayClosing: "17:00",
        })
      } catch (error) {
        catchError(error)
      }
    }
  }

  const currentBusinessHours = await getBusinessHoursAction()

  return (
    <Card as="section">
      <CardHeader className="my-2">
        <CardTitle className="text-2xl">Godziny przyjęć</CardTitle>
        <CardDescription>Edytuj godziny pracy przychodni</CardDescription>
      </CardHeader>
      <CardContent>
        {user && clinic && currentBusinessHours ? (
          <UpdateBusinessHoursForm
            currentBusinessHours={currentBusinessHours}
            userId={user.id}
            clinicId={clinic.id}
          />
        ) : (
          <p>Wczytywanie...</p>
        )}
      </CardContent>
    </Card>
  )
}
