import Link from "next/link"
import { type CuratedClinic } from "@/types"

import { getRandomPatternStyle } from "@/lib/generate-pattern"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

interface ClinicCardProps {
  clinic: CuratedClinic
  href: string
}

export function ClinicCard({ clinic, href }: ClinicCardProps) {
  return (
    <Link href={href}>
      <Card className="h-full overflow-hidden">
        <AspectRatio ratio={21 / 9}>
          <div className="absolute inset-0 bg-gradient-to-t from-transparent to-zinc-950/50" />

          <div
            className="h-full rounded-t-md border-b"
            style={getRandomPatternStyle(String(clinic.id))}
          />
        </AspectRatio>
        <CardHeader>
          <CardTitle className="line-clamp-1 text-lg">{clinic.name}</CardTitle>
          {clinic.description ? (
            <CardDescription className="line-clamp-2">
              {clinic.description}
            </CardDescription>
          ) : null}
        </CardHeader>
      </Card>
      <span className="sr-only">{clinic.name}</span>
    </Link>
  )
}
