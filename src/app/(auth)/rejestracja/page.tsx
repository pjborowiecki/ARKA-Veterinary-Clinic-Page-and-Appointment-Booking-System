import type { Metadata } from "next"
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
import { SignUpForm } from "@/components/forms/signup-form"
import { Shell } from "@/components/shells/shell"

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
  title: "Zakładanie konta",
  description: "Załóż konto aby móc korzystać z aplikacji",
}

export default async function SignUpPage() {
  const user = await currentUser()
  if (user) redirect("/rezerwacje")

  return (
    <Shell className="max-w-lg">
      <Card>
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Zakładanie konta</CardTitle>
          <CardDescription>
            Zarejestruj konto aby móc korzystać z aplikacji
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <SignUpForm />
        </CardContent>
        <CardFooter>
          <div className="text-sm text-muted-foreground">
            Posiadasz już konto?{" "}
            <Link
              aria-label="Logowanie"
              href="/logowanie"
              className="text-primary underline-offset-4 transition-colors hover:underline"
            >
              Zaloguj się
            </Link>
          </div>
        </CardFooter>
      </Card>
    </Shell>
  )
}
