"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { updatePassword } from "@/actions/auth"
import {
  passwordUpdateSchema,
  type PasswordUpdateFormInput,
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
import { Icons } from "@/components/icons"
import { PasswordInput } from "@/components/password-input"

interface PasswordUpdateFormProps {
  resetPasswordToken: string
}

export function PasswordUpdateForm({
  resetPasswordToken,
}: PasswordUpdateFormProps): JSX.Element {
  const router = useRouter()
  const { toast } = useToast()
  const [isPending, startTransition] = React.useTransition()

  const form = useForm<PasswordUpdateFormInput>({
    resolver: zodResolver(passwordUpdateSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  })

  function onSubmit(formData: PasswordUpdateFormInput): void {
    startTransition(async () => {
      try {
        const message = await updatePassword({
          password: formData.password,
          confirmPassword: formData.confirmPassword,
          resetPasswordToken,
        })

        switch (message) {
          case "expired":
            toast({
              title: "Nieprawidłowy lub brakujący token",
              description: "Spróbuj ponownie",
              variant: "destructive",
            })
            router.push(DEFAULT_UNAUTHENTICATED_REDIRECT)
            break
          case "success":
            toast({
              title: "Hasło zostało zaktualizowane",
              description:
                "Od teraz możesz logować się przy użyciu nowego hasła",
            })
            router.push(DEFAULT_UNAUTHENTICATED_REDIRECT)
            break
          default:
            toast({
              title: "Błąd przy aktualizacja hasła",
              description: "Spróbuj ponownie",
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
        className="grid gap-4"
        onSubmit={(...args) => void form.handleSubmit(onSubmit)(...args)}
      >
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
              <FormLabel>Potwierdzenie hasła</FormLabel>
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
              <span>Updating...</span>
            </>
          ) : (
            <span>Zatwierdź hasło</span>
          )}
          <span className="sr-only">Zatwierdź nowe hasło</span>
        </Button>
      </form>
    </Form>
  )
}
