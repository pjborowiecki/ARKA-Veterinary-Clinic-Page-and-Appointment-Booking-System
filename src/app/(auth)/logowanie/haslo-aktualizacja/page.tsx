import type { Metadata } from "next"
import Link from "next/link"
import { getUserByResetPasswordToken } from "@/actions/user"
import { env } from "@/env.mjs"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { PasswordUpdateForm } from "@/components/forms/auth/password-update-form"
import { Icons } from "@/components/icons"

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
  title: "Aktualizacja hasła",
  description: "Ustaw nowe hasło",
}

interface PasswordUpdatePageProps {
  searchParams: { [key: string]: string | string[] | undefined }
}

export default async function PasswordUpdatePage({
  searchParams,
}: PasswordUpdatePageProps): Promise<JSX.Element> {
  if (searchParams.token) {
    const user = await getUserByResetPasswordToken(String(searchParams.token))

    if (!user) {
      return (
        <div className="flex min-h-screen w-full items-center justify-center">
          <Card className="bg-background max-sm:flex max-sm:h-screen max-sm:w-full max-sm:flex-col max-sm:items-center max-sm:justify-center max-sm:rounded-none max-sm:border-none sm:min-w-[370px] sm:max-w-[368px]">
            <CardHeader>
              <CardTitle>Błędny kod resetujący</CardTitle>
              <CardDescription>
                Wróć do strony logowania i spróbuj ponownie
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link
                aria-label="Powrót do strony logowania"
                href="/logowanie"
                className={cn(
                  buttonVariants({ variant: "secondary" }),
                  "w-full"
                )}
              >
                <Icons.arrowLeft className="mr-2 size-4" />
                <span className="sr-only">Spróbuj ponownie</span>
                Spróbuj ponownie
              </Link>
            </CardContent>
          </Card>
        </div>
      )
    }

    return (
      <div className="flex min-h-screen w-full items-center justify-center">
        <Card className="bg-background max-sm:flex max-sm:h-screen max-sm:w-full max-sm:flex-col max-sm:items-center max-sm:justify-center max-sm:rounded-none max-sm:border-none sm:min-w-[370px] sm:max-w-[368px]">
          <CardHeader>
            <CardTitle>Aktualizacja hasła</CardTitle>
            <CardDescription>Ustaw swoje nowe hasło</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-2">
            <PasswordUpdateForm
              resetPasswordToken={String(searchParams.token)}
            />
            <Link
              aria-label="Anuluj aktualizację hasła"
              href="/logowanie"
              className={buttonVariants({ variant: "outline" })}
            >
              <span className="sr-only">Anuluj aktualizację hasła</span>
              Anuluj
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  } else {
    return (
      <div className="flex min-h-screen w-full items-center justify-center">
        <Card className="bg-background max-sm:flex max-sm:h-screen max-sm:w-full max-sm:flex-col max-sm:items-center max-sm:justify-center max-sm:rounded-none max-sm:border-none sm:min-w-[370px] sm:max-w-[368px]">
          <CardHeader>
            <CardTitle>Brak kodu resetującego</CardTitle>
            <CardDescription>
              Wróć do strony logowania i spróbuj ponownie
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link
              aria-label="Powrót do strony logowania"
              href="/logowanie"
              className={cn(buttonVariants({ variant: "secondary" }), "w-full")}
            >
              <Icons.arrowLeft className="mr-2 size-4" />
              <span className="sr-only">Spróbuj ponownie</span>
              Spróbuj ponownie
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }
}
