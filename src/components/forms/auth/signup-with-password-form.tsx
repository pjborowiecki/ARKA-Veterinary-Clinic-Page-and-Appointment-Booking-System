"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { signUpWithPassword } from "@/actions/auth"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { DEFAULT_UNAUTHENTICATED_REDIRECT } from "@/config/defaults"
import {
  signUpWithPasswordSchema,
  type SignUpWithPasswordFormInput,
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

export function SignUpWithPasswordForm(): JSX.Element {
  const router = useRouter()
  const { toast } = useToast()
  const [isPending, startTransition] = React.useTransition()

  const form = useForm<SignUpWithPasswordFormInput>({
    resolver: zodResolver(signUpWithPasswordSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  })

  function onSubmit(formData: SignUpWithPasswordFormInput): void {
    startTransition(async () => {
      try {
        const message = await signUpWithPassword({
          email: formData.email,
          password: formData.password,
          confirmPassword: formData.confirmPassword,
        })

        switch (message) {
          case "exists":
            toast({
              title: "Użytkownik o podanym adresie email już istnieje",
              description: "Jeżeli to Ty, przejdź do strony logowania",
              variant: "destructive",
            })
            form.reset()
            break
          case "success":
            toast({
              title: "Link weryfikacyjny został wysłany",
              description: "Sprawdź maila aby dokończyć rejestrację",
            })
            router.push(DEFAULT_UNAUTHENTICATED_REDIRECT)
            break
          default:
            toast({
              title: "Coś poszło nie tak",
              description: "Spróbuj ponownie",
              variant: "destructive",
            })
            console.error(message)
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
        className="grid gap-4"
        onSubmit={(...args) => void form.handleSubmit(onSubmit)(...args)}
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="jankowalski@gmail.com" {...field} />
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
                <PasswordInput placeholder="**********" {...field} />
              </FormControl>
              <FormMessage className="pt-2 sm:text-sm" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Potwierdź hasło</FormLabel>
              <FormControl>
                <PasswordInput placeholder="**********" {...field} />
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
              <span>Rejestruję...</span>
            </>
          ) : (
            <span>Kontynuuj</span>
          )}
          <span className="sr-only">
            Continue signing up with email and password
          </span>
        </Button>
      </form>
    </Form>
  )
}
