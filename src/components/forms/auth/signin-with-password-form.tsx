"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { checkIfEmailVerified } from "@/actions/email"
import { getUserByEmail } from "@/actions/user"
import { signInWithPasswordSchema } from "@/validations/auth"
import { zodResolver } from "@hookform/resolvers/zod"
import { signIn } from "next-auth/react"
import { useForm } from "react-hook-form"
import type { z } from "zod"

import { useToast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Icons } from "@/components/icons"
import { PasswordInput } from "@/components/password-input"

type SignInWithPasswordFormInputs = z.infer<typeof signInWithPasswordSchema>

export function SignInWithPasswordForm(): JSX.Element {
  const router = useRouter()
  const { toast } = useToast()
  const [isPending, startTransition] = React.useTransition()

  const form = useForm<SignInWithPasswordFormInputs>({
    resolver: zodResolver(signInWithPasswordSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  function onSubmit(formData: SignInWithPasswordFormInputs) {
    startTransition(async () => {
      try {
        const user = await getUserByEmail(formData.email)
        if (!user) {
          toast({
            title: "Wszystko po kolei",
            description:
              "Upewniej się, że założyłeś konto, zanim spróbujesz się zalogować",
          })
          return
        }

        const emailVerified = await checkIfEmailVerified(formData.email)
        if (!emailVerified) {
          toast({
            title: "Wszystko po kolei",
            description:
              "Zweryfikuj adres email zanim spróbujesz się zalogować",
          })
          return
        }

        const signInResponse = await signIn("credentials", {
          email: formData.email,
          password: formData.password,
          redirect: false,
        })

        if (signInResponse?.ok) {
          toast({ title: "Witaj!", description: "Jesteś zalogowany" })
          router.push("/")
          router.refresh()
        } else {
          toast({
            title: "Nieprawidłowy email lub hasło",
            description: "Sprawdź dane logowania i spróbuj ponownie",
            variant: "destructive",
          })
        }
      } catch (error) {
        toast({
          title: "Coś poszło nie tak",
          description: "Spróbuj ponownie",
          variant: "destructive",
        })
        console.error(error)
      }
    })
  }

  return (
    <Form {...form}>
      <form
        className="grid w-full gap-4"
        onSubmit={(...args) => void form.handleSubmit(onSubmit)(...args)}
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="johnsmith@gmail.com"
                  {...field}
                />
              </FormControl>
              <FormMessage className="pt-2 sm:text-sm" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Hasło</FormLabel>
              <FormControl>
                <PasswordInput placeholder="********" {...field} />
              </FormControl>
              <FormMessage className="pt-2 sm:text-sm" />
            </FormItem>
          )}
        />
        <Button disabled={isPending}>
          {isPending ? (
            <>
              <Icons.spinner
                className="mr-2 h-4 w-4 animate-spin"
                aria-hidden="true"
              />
              <span>Logowanie...</span>
            </>
          ) : (
            <span>Zaloguj</span>
          )}
          <span className="sr-only">Zaloguj się przy użyciu hasła</span>
        </Button>
      </form>
    </Form>
  )
}
