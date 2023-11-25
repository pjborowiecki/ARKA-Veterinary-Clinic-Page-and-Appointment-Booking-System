import type { Metadata } from "next"
import { notFound, redirect } from "next/navigation"
import {
  addBusinessHours,
  checkIfBusinessHoursExist,
  getBusinessHours,
} from "@/actions/availability"
import { addClinic, checkIfClinicExists, getClinic } from "@/actions/clinic"
import { env } from "@/env.mjs"

import { useToast } from "@/hooks/use-toast"
import { getCurrentUser } from "@/lib/auth"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { BusinessHoursUpdateForm } from "@/components/forms/clinic/business-hours-update-form"

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
  title: "Godziny przyjeć",
  description: "Edytuj godziny pracy przychodni oraz dni wolne",
}

export default async function ClinicBusinessHoursPage(): Promise<JSX.Element> {
  const user = await getCurrentUser()
  if (!user) redirect("/logowanie")

  const { toast } = useToast()

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
      console.error("Error adding new clinic", error)
      toast({
        title: "Something went wrong",
        decription: "Error adding new clinic",
        variant: "desctructive",
      })
    }
  }

  const clinic = await getClinicAction(user.id)

  if (!clinic) {
    notFound()
  } else {
    const businessHoursExist = await checkIfBusinessHoursExist(
      user.id,
      clinic.id
    )

    if (!businessHoursExist) {
      try {
        await addBusinessHours({
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
        // TODO
        console.log(error)
        throw new Error("Nie udało się dodać godzin przychodni")
      }
    }
  }

  const currentBusinessHours = await getBusinessHours()

  return (
    <Card as="section">
      <CardHeader className="my-2">
        <CardTitle className="text-2xl">Godziny przyjęć</CardTitle>
        <CardDescription>Edytuj godziny pracy przychodni</CardDescription>
      </CardHeader>
      <CardContent>
        {user && clinic && currentBusinessHours ? (
          <BusinessHoursUpdateForm
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
