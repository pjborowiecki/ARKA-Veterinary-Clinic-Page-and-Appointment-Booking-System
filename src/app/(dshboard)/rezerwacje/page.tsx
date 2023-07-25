import type { Metadata } from "next"
import { env } from "@/env.mjs"

import { Shell } from "@/components/shells/shell"

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
  title: "Rezerwacje",
  description: "Zobacz i zarządzaj swoimi rezerwacjami",
}

export default function ReservationsPage() {
  return (
    <Shell as="div" className="">
      Reservations page
    </Shell>
  )
}
