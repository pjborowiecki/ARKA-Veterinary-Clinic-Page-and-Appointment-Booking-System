"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { resendEmailVerificationLink } from "@/actions/email"
import { emailVerificationSchema } from "@/validations/auth"
import { zodResolver } from "@hookform/resolvers/zod"
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

type EmailVerificationFormInputs = z.infer<typeof emailVerificationSchema>

export function EmailVerificationForm(): JSX.Element {
  const router = useRouter()
  const { toast } = useToast()
  const [isPending, startTransition] = React.useTransition()

  const form = useForm<EmailVerificationFormInputs>({
    resolver: zodResolver(emailVerificationSchema),
    defaultValues: {
      email: "",
    },
  })

  function onSubmit(formData: EmailVerificationFormInputs): void {
    startTransition(async () => {
      try {
        const message = await resendEmailVerificationLink(formData.email)

        switch (message) {
          case "not-found":
            toast({
              title: "Użytkownik z podanym adresem email nie istnieje",
              variant: "destructive",
            })
            form.reset()
            break
          case "success":
            toast({
              title: "Link weryfikacyjny został wysłany",
              description:
                "Kliknij w otrzymanego linka w celu dokończenia weryfikacji",
            })
            router.push("/logowanie")
            break
          default:
            toast({
              title: "Błąd przy wysyłaniu linka weryfikacyjnego",
              description: "Spróbuj ponownie",
              variant: "destructive",
            })
            router.push("/rejestracja")
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
        className="grid gap-4 "
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

        <Button disabled={isPending}>
          {isPending ? (
            <>
              <Icons.spinner
                className="mr-2 size-4 animate-spin"
                aria-hidden="true"
              />
              <span>Wysyłanie...</span>
            </>
          ) : (
            <span>Wyślij link</span>
          )}
          <span className="sr-only">
            Prześlij link weryfikacyjny na podany adres email
          </span>
        </Button>
      </form>
    </Form>
  )
}
