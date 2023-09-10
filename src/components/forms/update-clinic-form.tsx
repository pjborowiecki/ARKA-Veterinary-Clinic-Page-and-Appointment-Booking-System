"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { updateClinicAction } from "@/actions/clinic"
import type { Clinic } from "@/db/schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import type { z } from "zod"

import { catchError } from "@/lib/utils"
import { clinicSchema } from "@/lib/validations/clinic"
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

interface UpdateClinicFormProps {
  clinic: Clinic
  userId: string
}

type Inputs = z.infer<typeof clinicSchema>

export function UpdateClinicForm({ clinic, userId }: UpdateClinicFormProps) {
  const router = useRouter()
  const [isPending, startTransition] = React.useTransition()

  const form = useForm<Inputs>({
    resolver: zodResolver(clinicSchema),
    defaultValues: {
      latitude: clinic.latitude,
      longitude: clinic.longitude,
      address: clinic.address,
      phone: clinic.phone,
      email: clinic.email,
    },
  })

  function onSubmit(data: Inputs) {
    startTransition(async () => {
      try {
        await updateClinicAction({ ...data, userId })
        form.reset()
        toast.success("Dane przychodni zostały zaktualizowane")
        router.push("admin/przychodnia")
        router.refresh()
      } catch (error) {
        catchError(error)
      }
    })
  }

  return (
    <Form {...form}>
      <form
        className="grid w-full max-w-xl gap-5"
        onSubmit={(...args) => void form.handleSubmit(onSubmit)(...args)}
      >
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Telefon</FormLabel>
                <FormControl>
                  <Input type="tel" placeholder="14 611 64 99" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
        </div>

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
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
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
              className="mr-2 h-4 w-4 animate-spin"
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
