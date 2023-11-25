"use client"

import { env } from "@/env.mjs"

export function GoogleMapWidget(): JSX.Element {
  return (
    <div className="h-full w-full">
      <iframe
        src={env.GOOGLE_MAPS_URL}
        width="100%"
        height="100%"
        style={{ borderRadius: "20px" }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Mapa Google z lokalizacją przychodni wterynaryjnej ARKA w Bochni"
      />
    </div>
  )
}
