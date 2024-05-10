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
import { EmailVerificationForm } from "@/components/forms/auth/email-verification-form"

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
  title: "Weryfikacja maila",
  description: "Podaj email aby otrzymać link weryfikacyjny",
}

export default function ReverifyEmailPage(): JSX.Element {
  return (
    <div className="flex min-h-screen w-full items-center justify-center">
      <Card className="bg-background max-sm:flex max-sm:h-screen max-sm:w-full max-sm:flex-col max-sm:items-center max-sm:justify-center max-sm:rounded-none max-sm:border-none sm:min-w-[370px] sm:max-w-[368px]">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Weryfikacja maila</CardTitle>
          <CardDescription>
            Podaj email aby otrzymać link weryfikacyjny
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-2">
          <EmailVerificationForm />
          <Link
            aria-label="Cancel email reverification"
            href="/logowanie"
            className={buttonVariants({ variant: "outline" })}
          >
            <span className="sr-only">
              Anuluj prośbę o wysłanie linka weryfikacyjnego
            </span>
            Anuluj
          </Link>
        </CardContent>
      </Card>
    </div>
  )
}
