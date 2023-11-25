import { type Metadata } from "next"
import { notFound, redirect } from "next/navigation"
import { db } from "@/db"
import { bookings, clinics, type Booking } from "@/db/schema"
import { env } from "@/env.mjs"
import { and, asc, desc, eq, gte, inArray, like, lte, sql } from "drizzle-orm"

import { getCurrentUser } from "@/lib/auth"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { DateRangePicker } from "@/components/date-range-picker"
import { BookingsTableShell } from "@/components/shells/bookings-table-shell"

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
  title: "Rezerwacje",
  description: "Zarządzaj swoimi rezerwacjami",
}

interface ClinicBookingsPageProps {
  searchParams: {
    [key: string]: string | string[] | undefined
  }
}

export default async function ClinicBookingsPage({
  searchParams,
}: ClinicBookingsPageProps): Promise<JSX.Element> {
  const user = await getCurrentUser()
  if (!user) redirect("/logowanie")

  const { page, per_page, sort, from, to, lastName, type, slot, email } =
    searchParams ?? {}

  const clinic = await db.query.clinics.findFirst({
    where: eq(clinics.userId, user.id),
    columns: {
      id: true,
      userId: true,
    },
  })

  if (!clinic) {
    notFound()
  }

  const limit = typeof per_page === "string" ? parseInt(per_page) : 10

  const offset =
    typeof page === "string"
      ? parseInt(page) > 0
        ? (parseInt(page) - 1) * limit
        : 0
      : 0

  const [column, order] =
    typeof sort === "string"
      ? (sort.split(".") as [
          keyof Booking | undefined,
          "asc" | "desc" | undefined,
        ])
      : []

  const types =
    typeof type === "string" ? (type.split(".") as Booking["type"][]) : []

  const fromDay = typeof from === "string" ? new Date(from) : undefined
  const toDay = typeof to === "string" ? new Date(to) : undefined

  const { items, count } = await db.transaction(async (tx) => {
    const items = await tx
      .select()
      .from(bookings)
      .limit(limit)
      .offset(offset)
      .where(
        and(
          eq(bookings.clinicId, clinic.id),

          // Filter by lat name
          typeof lastName === "string"
            ? like(bookings.lastName, `%${lastName}%`)
            : undefined,

          // Filter by type
          types.length > 0 ? inArray(bookings.type, types) : undefined,

          // Filter by email
          typeof email === "string"
            ? like(bookings.email, `%${email}%`)
            : undefined,

          // Filter by createdAt
          fromDay && toDay
            ? and(
                gte(bookings.createdAt, fromDay),
                lte(bookings.createdAt, toDay)
              )
            : undefined
        )
      )
      .orderBy(
        column && column in bookings
          ? order === "asc"
            ? asc(bookings[column])
            : desc(bookings[column])
          : desc(bookings.createdAt)
      )

    const count = await tx
      .select({
        count: sql<number>`count(${bookings.id})`,
      })
      .from(bookings)
      .where(
        and(
          eq(bookings.clinicId, clinic.id),

          // Filter by lastname
          typeof lastName === "string"
            ? like(bookings.lastName, `%${lastName}%`)
            : undefined,

          // Filter by type
          types.length > 0 ? inArray(bookings.type, types) : undefined,

          // Filter by email
          typeof email === "string"
            ? like(bookings.email, `%${email}%`)
            : undefined,

          // Filter by createdAt
          fromDay && toDay
            ? and(
                gte(bookings.createdAt, fromDay),
                lte(bookings.createdAt, toDay)
              )
            : undefined
        )
      )
      .then((res) => res[0]?.count ?? 0)

    return {
      items,
      count,
    }
  })

  const pageCount = Math.ceil(count / limit)

  return (
    <Card as="section">
      <CardHeader className="mt-2 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <CardTitle className="text-2xl">Rezerwacje</CardTitle>
          <CardDescription>Zarządzaj rezerwacjami</CardDescription>
        </div>

        <DateRangePicker align="end" />
      </CardHeader>
      <CardContent>
        <BookingsTableShell
          data={items}
          pageCount={pageCount}
          clinicId={clinic.id}
        />
      </CardContent>
    </Card>
  )
}
