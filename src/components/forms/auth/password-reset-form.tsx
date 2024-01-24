"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { resetPassword } from "@/actions/auth"
import {
  passwordResetSchema,
  type PasswordResetFormInput,
} from "@/validations/auth"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { DEFAULT_UNAUTHENTICATED_REDIRECT } from "@/config/defaults"
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

export function PasswordResetForm(): JSX.Element {
  const router = useRouter()
  const { toast } = useToast()
  const [isPending, startTransition] = React.useTransition()

  const form = useForm<PasswordResetFormInput>({
    resolver: zodResolver(passwordResetSchema),
    defaultValues: {
      email: "",
    },
  })

  function onSubmit(formData: PasswordResetFormInput): void {
    startTransition(async () => {
      try {
        const message = await resetPassword({ email: formData.email })

        switch (message) {
          case "not-found":
            toast({
              title: "Użytkownik o podanym adresie email nie istnieje",
              variant: "destructive",
            })
            form.reset()
            break
          case "success":
            toast({
              title: "Link został wysłany",
              description: "Sprawdź maila aby dokończyć resetowanie hasła",
            })
            router.push(DEFAULT_UNAUTHENTICATED_REDIRECT)
            break
          default:
            toast({
              title: "Błąd przy resetowaniu kasła",
              description: "Spróbuj ponownie",
              variant: "destructive",
            })
            router.push(DEFAULT_UNAUTHENTICATED_REDIRECT)
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
            <span>Kontynuuj</span>
          )}
          <span className="sr-only">Kontynuuj resetowanie hasła</span>
        </Button>
      </form>
    </Form>
  )
}
