"use client"

import * as React from "react"
import { bookings } from "@/db/schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { format } from "date-fns"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import type { z } from "zod"

import { cn } from "@/lib/utils"
import { bookingSchema } from "@/lib/validations/booking"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  UncontrolledFormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Icons } from "@/components/icons"
import { addBookingAction, checkBookingAction } from "@/app/_actions/booking"

type Inputs = z.infer<typeof bookingSchema>

export function AddBookingForm() {
  const [isPending, startTransition] = React.useTransition()

  const form = useForm<Inputs>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      type: "weterynarz",
      date: new Date(),
      time: "",
      name: "",
      surname: "",
      email: "",
      phone: "",
      message: "",
      rodo: false,
    },
  })

  function onSubmit(data: Inputs) {
    startTransition(async () => {
      try {
        await checkBookingAction({
          date: data.date,
          time: data.time,
          type: data.type,
        })

        await addBookingAction({
          ...data,
        })

        toast.success(
          "Dziękujemy! Wkrótce skontaktujemy się z Tobą by potwierdzić wizytę."
        )

        form.reset()
      } catch (err) {
        console.error(err)
      }
    })
  }

  return (
    <Form {...form}>
      <form
        className=""
        onSubmit={(...args) => void form.handleSubmit(onSubmit)(...args)}
      >
        {/* Service */}
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Usługa</FormLabel>
              <FormControl>
                <Select
                  value={field.value}
                  onValueChange={(value: typeof field.value) =>
                    field.onChange(value)
                  }
                >
                  <SelectTrigger className="capitalize">
                    <SelectValue placeholder={field.value} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {Object.values(bookings.type.enumValues).map((option) => (
                        <SelectItem
                          key={option}
                          value={option}
                          className="capitalize"
                        >
                          {option}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </FormControl>
              <UncontrolledFormMessage
                message={form.formState.errors.type?.message}
              />
            </FormItem>
          )}
        />

        {/* Date */}
        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Termin</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[240px] pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Wybierz termin</span>
                      )}
                      <Icons.calendar className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) => date < new Date()}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </FormItem>
          )}
        />

        {/* Time */}
        {/* TODO */}

        {/* Name */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Imię</FormLabel>
              <FormControl>
                <Input
                  aria-invalid={!!form.formState.errors.name}
                  placeholder="Jan"
                  {...field}
                />
              </FormControl>
              <UncontrolledFormMessage
                message={form.formState.errors.name?.message}
              />
            </FormItem>
          )}
        />

        {/* Surname */}
        <FormField
          control={form.control}
          name="surname"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nazwisko</FormLabel>
              <FormControl>
                <Input placeholder="Kowalski" {...field} />
              </FormControl>
              <UncontrolledFormMessage
                message={form.formState.errors.surname?.message}
              />
            </FormItem>
          )}
        />

        {/* Email */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="jankowalski@gmail.com" {...field} />
              </FormControl>
              <UncontrolledFormMessage
                message={form.formState.errors.email?.message}
              />
            </FormItem>
          )}
        />

        {/* TODO */}
        {/* Phone */}
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Telefon</FormLabel>
              <FormControl>
                <Input placeholder="123456789" {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        {/* Message */}
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Wiadomość</FormLabel>
              <FormControl>
                <Textarea placeholder="Wiadomość (opcjonalnie)" {...field} />
              </FormControl>
              <UncontrolledFormMessage
                message={form.formState.errors.message?.message}
              />
            </FormItem>
          )}
        />

        {/* Rodo */}
        {/* TODO */}

        {/* Submit */}
        <Button type="submit" disabled={isPending}>
          {isPending && (
            <Icons.spinner
              className="mr-2 h-4 w-4 animate-spin"
              aria-hidden="true"
            />
          )}
          Zarezerwuj
          <span className="sr-only">Zarezerwuj</span>
        </Button>
      </form>
    </Form>
  )
}
