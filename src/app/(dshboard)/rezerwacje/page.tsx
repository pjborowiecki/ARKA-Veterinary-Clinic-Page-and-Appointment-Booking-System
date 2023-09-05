import type { Metadata } from "next"
import { db } from "@/db"
import { bookings, type Booking } from "@/db/schema"
import { env } from "@/env.mjs"
import { and, asc, desc, inArray, like, sql } from "drizzle-orm"

import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header"
import { BookingsTableShell } from "@/components/shells/bookings-table-shell"
import { Shell } from "@/components/shells/shell"

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
  title: "Rezerwacje",
  description: "Przeglądaj i zarządzaj swoimi rezerwacjami",
}

interface BookingsPageProps {
  searchParams: {
    [key: string]: string | string[] | undefined
  }
}

export default async function BookingsPage({
  searchParams,
}: BookingsPageProps) {
  const { page, per_page, sort, name, type } = searchParams

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

  const { filteredBookings, allBookings } = await db.transaction(async (tx) => {
    const filteredBookings = await tx
      .select()
      .from(bookings)
      .limit(limit)
      .offset(offset)
      .where(
        and(
          typeof name === "string"
            ? like(bookings.name, `%${name}%`)
            : undefined,
          types.length > 0 ? inArray(bookings.type, types) : undefined
        )
      )
      .orderBy(
        column && column in bookings
          ? order === "asc"
            ? asc(bookings[column])
            : desc(bookings[column])
          : desc(bookings.createdAt)
      )

    const allBookings = await tx
      .select({
        count: sql<number>`count(${bookings.id})`,
      })
      .from(bookings)
      .where(
        and(
          typeof name === "string"
            ? like(bookings.name, `%${name}%`)
            : undefined,
          types.length > 0 ? inArray(bookings.type, types) : undefined
        )
      )

    return {
      filteredBookings,
      allBookings: Number(allBookings[0]?.count) ?? 0,
    }
  })

  const pageCount = Math.ceil(allBookings / limit)

  return (
    <Shell variant="sidebar">
      <PageHeader
        id="dashboard-bookings-header"
        aria-labelledby="dashboard-bookings-header"
        className="my-8"
      >
        <PageHeaderHeading size="sm">Rezerwacje</PageHeaderHeading>
        <PageHeaderDescription size="sm">
          Zarządzanie rezerwacjami
        </PageHeaderDescription>
      </PageHeader>
      <BookingsTableShell data={filteredBookings} pageCount={pageCount} />
    </Shell>
  )
}
