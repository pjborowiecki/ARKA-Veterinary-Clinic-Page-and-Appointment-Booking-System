import { type Metadata } from "next"
import { env } from "@/env.mjs"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { ResetPasswordStep2Form } from "@/components/forms/reset-password-form-step2"
import { Shell } from "@/components/shells/shell"

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
  title: "Resetowanie hasła",
  description:
    "Poadaj swój adres email aby otrzymać kod weryfikacyjny i zresetować hasło",
}

export default function ResetPasswordStep2Page() {
  return (
    <Shell className="max-w-lg">
      <Card>
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Resetowanie hasła</CardTitle>
          <CardDescription>
            Podaj swój adres email w celu otrzymania kodu weryfikacyjnego
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResetPasswordStep2Form />
        </CardContent>
      </Card>
    </Shell>
  )
}
