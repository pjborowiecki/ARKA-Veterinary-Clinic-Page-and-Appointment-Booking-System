import { type Metadata } from "next"
import Link from "next/link"
import { env } from "@/env.mjs"

import { buttonVariants } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { PasswordResetForm } from "@/components/forms/auth/password-reset-form"

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
  title: "Resetowanie hasła",
  description: "Podaj adres email aby otrzymać link do zresetowania hasła",
}

export default function PasswordReset(): JSX.Element {
  return (
    <div className="flex min-h-screen w-full items-center justify-center">
      <Card className="bg-background max-sm:flex max-sm:h-screen max-sm:w-full max-sm:flex-col max-sm:items-center max-sm:justify-center max-sm:rounded-none max-sm:border-none sm:min-w-[370px] sm:max-w-[368px]">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Resetowanie hasła</CardTitle>
          <CardDescription>
            Link zostanie wysłany na wskazany adres
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-2">
          <PasswordResetForm />
          <Link
            aria-label="Wróć do strony logowania"
            href="/logowanie"
            className={buttonVariants({ variant: "outline" })}
          >
            Anuluj
          </Link>
        </CardContent>
      </Card>
    </div>
  )
}
