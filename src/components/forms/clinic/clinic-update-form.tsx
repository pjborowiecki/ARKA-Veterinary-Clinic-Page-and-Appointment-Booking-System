"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { updateClinic } from "@/actions/clinic"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import type { Clinic } from "@/db/schema"
import {
  updateClinicSchema,
  type UpdateClinicInput,
} from "@/validations/clinic"

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

interface ClinicUpdateFormProps {
  clinic: Clinic
}

export function ClinicUpdateForm({
  clinic,
}: ClinicUpdateFormProps): JSX.Element {
  const router = useRouter()
  const { toast } = useToast()
  const [isPending, startTransition] = React.useTransition()

  const form = useForm<UpdateClinicInput>({
    resolver: zodResolver(updateClinicSchema),
    defaultValues: {
      latitude: clinic.latitude,
      longitude: clinic.longitude,
      address: clinic.address,
      phone_1: clinic.phone_1,
      phone_2: clinic.phone_2,
      email: clinic.email,
    },
  })

  function onSubmit(formData: UpdateClinicInput) {
    startTransition(async () => {
      try {
        const message = await updateClinic({
          id: formData.id,
          latitude: formData.latitude,
          longitude: formData.longitude,
          address: formData.address,
          phone_1: formData.phone_1,
          phone_2: formData.phone_2,
          email: formData.email,
        })

        switch (message) {
          case "not-found":
            toast({
              title: "Nie znaleziono przychodni",
              description: "Nie udało się znaleźć przychodni o podanym ID",
              variant: "destructive",
            })
            break
          case "success":
            toast({ title: "Dane przychodni zostały zaktualizowane" })
            router.push("/admin/przychodnia")
            break
          default:
            toast({
              title: "Coś poszło nie tak",
              description: "Nie udało się zaktualizować danych przychodni",
              variant: "destructive",
            })
        }
      } catch (error) {
        console.error(error)
        toast({
          title: "Coś poszło nie tak",
          description: "Nie udało się zaktualizować danych przychodni",
          variant: "destructive",
        })
      }
    })
  }

  return (
    <Form {...form}>
      <form
        className="grid w-full max-w-xl gap-6"
        onSubmit={(...args) => void form.handleSubmit(onSubmit)(...args)}
      >
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <FormField
            control={form.control}
            name="phone_1"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Telefon stacjonarny</FormLabel>
                <FormControl>
                  <Input type="tel" placeholder="14 61 164 99" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone_2"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Telefon komórkowy</FormLabel>
                <FormControl>
                  <Input type="tel" placeholder="501 014 554" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="arka@gmail.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Adres</FormLabel>
              <FormControl>
                <Input
                  placeholder="Brodzińskiego 2, 32-700 Bochnia"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <FormField
            control={form.control}
            name="latitude"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Szerokość geograficzna</FormLabel>
                <FormControl>
                  <Input placeholder="49.963088528718764" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="longitude"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Długość geograficzna</FormLabel>
                <FormControl>
                  <Input placeholder="20.419507255029654" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button className="mt-4 w-full" disabled={isPending}>
          {isPending && (
            <Icons.spinner
              className="mr-2 size-4 animate-spin"
              aria-hidden="true"
            />
          )}
          Aktualizuj
          <span className="sr-only">Aktualizuj</span>
        </Button>
      </form>
    </Form>
  )
}
