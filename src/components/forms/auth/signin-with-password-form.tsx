"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { signInWithPassword } from "@/actions/auth"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { DEFAULT_SIGNIN_REDIRECT } from "@/config/defaults"
import {
  signInWithPasswordSchema,
  type SignInWithPasswordFormInput,
} from "@/validations/auth"

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

export function SignInWithPasswordForm(): JSX.Element {
  const router = useRouter()
  const { toast } = useToast()
  const [isPending, startTransition] = React.useTransition()

  const form = useForm<SignInWithPasswordFormInput>({
    resolver: zodResolver(signInWithPasswordSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  function onSubmit(formData: SignInWithPasswordFormInput) {
    startTransition(async () => {
      try {
        const message = await signInWithPassword({
          email: formData.email,
          password: formData.password,
        })

        switch (message) {
          case "not-registered":
            toast({
              title: "Wszystko po kolei",
              description:
                "Upewniej się, że założyłeś konto, zanim spróbujesz się zalogować",
            })
            break
          case "unverified-email":
            toast({
              title: "Wszystko po kolei",
              description:
                "Zweryfikuj adres email zanim spróbujesz się zalogować",
            })
            break
          case "invalid-credentials":
            toast({
              title: "Nieprawidłowy email lub hasło",
              description: "Sprawdź dane logowania i spróbuj ponownie",
              variant: "destructive",
            })
            break
          case "success":
            toast({
              title: "Witaj!",
              description: "Jesteś zalogowany",
            })
            router.push(DEFAULT_SIGNIN_REDIRECT)
            break
          default:
            toast({
              title: "Coś poszło nie tak",
              description: "Spróbuj ponownie",
              variant: "destructive",
            })
        }
      } catch (error) {
        console.error(error)

        toast({
          title: "Coś poszło nie tak",
          description: "Spróbuj ponownie",
          variant: "destructive",
        })
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
                  placeholder="jankowalski@gmail.com"
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
                className="mr-2 size-4 animate-spin"
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
