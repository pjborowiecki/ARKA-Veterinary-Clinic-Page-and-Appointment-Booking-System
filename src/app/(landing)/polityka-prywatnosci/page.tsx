import type { Metadata } from "next"
import { env } from "@/env.mjs"

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
  title: "Polityka prywatności",
  description: "Polityka prywatności oraz klauzula RODO",
}

export default function PrivacyPolicyPage(): JSX.Element {
  return <div>Polityka prywatności i RODO</div>
}
