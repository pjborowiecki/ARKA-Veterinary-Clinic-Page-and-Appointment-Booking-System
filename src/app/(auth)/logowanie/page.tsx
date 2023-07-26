import { type Metadata } from "next"
import Link from "next/link"
import { redirect } from "next/navigation"
import { env } from "@/env.mjs"
import { currentUser } from "@clerk/nextjs"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { SignInForm } from "@/components/forms/signin-form"
import { Shell } from "@/components/shells/shell"

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
  title: "Logowanie",
  description: "Zaloguj się by zobaczyć swoje rezerwacje",
}

export default async function SignInPage() {
  const user = await currentUser()
  if (user) redirect("/rezerwacje")

  return (
    <Shell className="max-w-lg">
      <Card>
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Logowanie</CardTitle>
          <CardDescription>Zaloguj się aby zobaczyć rezerwacje</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <SignInForm />
        </CardContent>
        <CardFooter className="flex flex-wrap items-center justify-between gap-2">
          <div className="text-sm text-muted-foreground">
            <span className="mr-1 hidden sm:inline-block">
              Nie posiadasz konta?
            </span>
            <Link
              aria-label="Rejestracja"
              href="/rejestracja"
              className="text-primary underline-offset-4 transition-colors hover:underline"
            >
              Załóż konto
            </Link>
          </div>
          <Link
            aria-label="Zresetuj hasło"
            href="/logowanie/zresetuj-haslo"
            className="text-sm text-primary underline-offset-4 transition-colors hover:underline"
          >
            Zresetuj hasło
          </Link>
        </CardFooter>
      </Card>
    </Shell>
  )
}
