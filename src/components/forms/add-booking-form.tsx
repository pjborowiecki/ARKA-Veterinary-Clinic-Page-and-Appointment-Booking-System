"use client"

import * as React from "react"
import { addBookingAction, checkBookingAction } from "@/actions/booking"
import { bookings } from "@/db/schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { Checkbox } from "@radix-ui/react-checkbox"
import { format } from "date-fns"
import { pl } from "date-fns/locale"
import dayjs from "dayjs"
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

type Inputs = z.infer<typeof bookingSchema>

export function AddBookingForm() {
  const [isPending, startTransition] = React.useTransition()

  const form = useForm<Inputs>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      type: "weterynarz",
      date: undefined,
      // time: undefined,
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      message: "",
      // rodo: false,
      status: "niepotwierdzone",
    },
  })

  const handleDayClick = (date: Date) => {
    // form.setValue("date", date)
    form.setValue()
    console.log("date: ", date)
  }

  function onSubmit(data: Inputs) {
    startTransition(async () => {
      try {
        // await checkBookingAction({
        //   date: data.date,
        //   // time: data.time,
        //   type: data.type,
        // })

        await addBookingAction({
          ...data,
        })

        console.log(data)

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
        className="grid gap-4"
        onSubmit={(...args) => void form.handleSubmit(onSubmit)(...args)}
      >
        {/* Service */}
        <div className="grid grid-cols-2 gap-4">
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
                        {Object.values(bookings.type.enumValues).map(
                          (option) => (
                            <SelectItem
                              key={option}
                              value={option}
                              className="capitalize"
                            >
                              {option}
                            </SelectItem>
                          )
                        )}
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
        </div>
        <div className="grid grid-cols-2 gap-4">
          {/* Date */}
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Termin</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        size={"datePicker"}
                        className={cn(
                          "w-full text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP", { locale: pl })
                        ) : (
                          <span>Wybierz termin</span>
                        )}
                        <Icons.calendar className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      locale={pl}
                      required
                      mode="single"
                      selected={field.value}
                      // onSelect={field.onChange}
                      onSelect={handleDayClick}
                      disabled={(date) => date < new Date()}
                      // modifiers={{ booked: bookedDays }}
                      // modifiersStyles={{ booked: bookedStyle }}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </FormItem>
            )}
          />

          {/* Time */}
          {/* <FormField
            control={form.control}
            name="time"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Godzina</FormLabel>
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
                        {Object.values(bookings.time.enumValues).map(
                          (option) => (
                            <SelectItem
                              key={option}
                              value={option}
                              className="capitalize"
                            >
                              {option}
                            </SelectItem>
                          )
                        )}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
                <UncontrolledFormMessage>
                  {form.formState.errors.time?.message}
                </UncontrolledFormMessage>
              </FormItem>
            )}
          /> */}
        </div>
        <div className="grid grid-cols-2 gap-4">
          {/* First Name */}
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Imię</FormLabel>
                <FormControl>
                  <Input
                    aria-invalid={!!form.formState.errors.firstName}
                    placeholder="Jan"
                    {...field}
                  />
                </FormControl>
                <UncontrolledFormMessage
                  message={form.formState.errors.firstName?.message}
                />
              </FormItem>
            )}
          />

          {/* Last Name */}
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nazwisko</FormLabel>
                <FormControl>
                  <Input placeholder="Kowalski" {...field} />
                </FormControl>
                <UncontrolledFormMessage
                  message={form.formState.errors.lastName?.message}
                />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
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

          {/* Phone */}
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Telefon</FormLabel>
                <FormControl>
                  <Input type="tel" placeholder="123456789" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        {/* Message */}
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Wiadomość</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Wiadomość (opcjonalnie)"
                  {...field}
                  className="min-h-[80px]"
                />
              </FormControl>
              <UncontrolledFormMessage
                message={form.formState.errors.message?.message}
              />
            </FormItem>
          )}
        />

        {/* Rodo */}
        {/* <FormField
          control={form.control}
          name="rodo"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>

              <FormLabel>
                Wyrażam zgodę na przetwarzanie moich danych osobowych w celu
                realizacji usługi
              </FormLabel>
            </FormItem>
          )}
        /> */}

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
