import { type Metadata } from "next"
import Link from "next/link"
import { redirect } from "next/navigation"
import { auth } from "@/auth"
import { env } from "@/env.mjs"

import { DEFAULT_SIGNIN_REDIRECT } from "@/config/defaults"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { SignUpWithPasswordForm } from "@/components/forms/auth/signup-with-password-form"
import { Icons } from "@/components/icons"

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
  title: "Rejestracja",
  description: "Załóż konto aby korzystać z panelu administratora",
}

export default async function SignUpPage(): Promise<JSX.Element> {
  const session = await auth()
  if (session?.user) redirect(DEFAULT_SIGNIN_REDIRECT)

  return (
    <div className="flex h-auto min-h-screen w-full items-center justify-center md:flex">
      <Card className="bg-background max-sm:flex max-sm:w-full max-sm:flex-col max-sm:items-center max-sm:justify-center max-sm:rounded-none max-sm:border-none sm:min-w-[370px] sm:max-w-[368px]">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl">Rejestracja</CardTitle>
            <Link href="/">
              <Icons.close className="size-4" />
            </Link>
          </div>
          <CardDescription>
            Załóż konto by uzyskać władzę administratora
          </CardDescription>
        </CardHeader>
        <CardContent className="max-sm:w-full max-sm:max-w-[340px] max-sm:px-10">
          <SignUpWithPasswordForm />
        </CardContent>
        <CardFooter className="grid w-full gap-4 text-sm text-muted-foreground max-sm:max-w-[340px] max-sm:px-10">
          <div>
            <div>
              <span>Posiadasz już konto? </span>
              <Link
                aria-label="Sign in"
                href="/logowanie"
                className="font-bold tracking-wide text-primary underline-offset-4 transition-all hover:underline"
              >
                Zaloguj się
                <span className="sr-only">Zaloguj się</span>
              </Link>
              .
            </div>
            <div>
              <span>Zgubiłeś link weryfikacyjny? </span>
              <Link
                aria-label="Resend email verification link"
                href="/rejestracja/potwierdz-email-ponownie"
                className="text-sm font-normal text-primary underline-offset-4 transition-colors hover:underline"
              >
                Wyślij ponownie
                <span className="sr-only">
                  Wyślij link weryfikacyjny ponownie
                </span>
              </Link>
              .
            </div>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
