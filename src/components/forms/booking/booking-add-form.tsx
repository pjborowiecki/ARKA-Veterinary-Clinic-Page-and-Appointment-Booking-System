"use client"

import * as React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { addBooking } from "@/actions/booking"
import { zodResolver } from "@hookform/resolvers/zod"
import { format } from "date-fns"
import { pl } from "date-fns/locale"
import { useForm } from "react-hook-form"

import { bookings, type Booking, type BusinessHours } from "@/db/schema"
import { addBookingSchema, type AddBookingInput } from "@/validations/booking"
import { DAYS_OF_WEEK, TIME_INTERVAL } from "@/data/constants"

import { useToast } from "@/hooks/use-toast"
import { getDaysClosed, getTimeOptions } from "@/lib/booking"
import { cn } from "@/lib/utils"

import { Button, buttonVariants } from "@/components/ui/button"
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

interface BookingAddFormProps {
  existingBookings: Booking[] | null
  datesUnavailable: Date[]
  businessHours: BusinessHours | null
}

export function BookingAddForm({
  existingBookings,
  datesUnavailable,
  businessHours,
}: BookingAddFormProps): JSX.Element {
  const router = useRouter()
  const { toast } = useToast()
  const [isPending, startTransition] = React.useTransition()

  const daysClosed = businessHours
    ? getDaysClosed(businessHours, DAYS_OF_WEEK)
    : []

  const form = useForm<AddBookingInput>({
    resolver: zodResolver(addBookingSchema),
    defaultValues: {
      type: "weterynarz",
      date: undefined,
      time: undefined,
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      message: "",
      status: "niepotwierdzone",
    },
  })

  function onSubmit(formData: AddBookingInput) {
    startTransition(async () => {
      try {
        const message = await addBooking({
          type: formData.type,
          date: formData.date,
          time: formData.time,
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          message: formData.message,
          status: formData.status,
        })

        // TODO: Add a check for date and time already taken
        switch (message) {
          case "success":
            toast({
              title: "Dziękujemy!",
              description:
                "Wkrótce skontaktujemy się z Tobą by potwierdzić wizytę",
            })
            router.push("/")
            break
          default:
            toast({
              title: "Coś poszło nie tak",
              description: "Spróbuj zarezerwować ponownie",
              variant: "destructive",
            })
        }
      } catch (error) {
        console.error(error)
        toast({
          title: "Coś poszło nie tak",
          description: "Spróbuj zarezerwować ponownie",
          variant: "destructive",
        })
      }
    })
  }

  const timeOptions = getTimeOptions(
    form.watch("date"),
    form.watch("type"),
    existingBookings || [],
    businessHours || ({} as BusinessHours),
    TIME_INTERVAL
  )

  return (
    <Form {...form}>
      <form
        className="grid w-full gap-4"
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
                        <Icons.calendar className="ml-auto size-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      locale={pl}
                      required
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      modifiers={{
                        disabled: [
                          { before: new Date() },
                          { dayOfWeek: daysClosed },
                          ...datesUnavailable,
                        ],
                      }}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </FormItem>
            )}
          />

          {/* Time */}
          {form.watch("date") && (
            <FormField
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
                      disabled={timeOptions && timeOptions.length === 0}
                    >
                      <SelectTrigger className="capitalize">
                        <SelectValue
                          placeholder={field.value || "Wybierz godzinę"}
                        />
                      </SelectTrigger>
                      <SelectContent className="h-[220pmax-h-[220px] overflow-y-scroll">
                        <SelectGroup>
                          {timeOptions &&
                            timeOptions.map((option) => (
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
                  <UncontrolledFormMessage>
                    {form.formState.errors.time?.message}
                  </UncontrolledFormMessage>
                </FormItem>
              )}
            />
          )}
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

        {/* Buttons */}
        <div className="grid w-full grid-cols-2 gap-4">
          <Link href="/" className={buttonVariants({ variant: "outline" })}>
            Anuluj
          </Link>

          <Button
            type="submit"
            disabled={
              isPending ||
              form.getValues("date") === undefined ||
              form.getValues("time") === undefined ||
              form.getValues("firstName") === "" ||
              form.getValues("lastName") === "" ||
              form.getValues("email") === "" ||
              form.getValues("phone") === ""
            }
          >
            {isPending ? (
              <>
                <Icons.spinner
                  className="mr-2 size-4 animate-spin"
                  aria-hidden="true"
                />
                <span>Rezerwuję...</span>
              </>
            ) : (
              <span>Zarezerwuj</span>
            )}
            <span className="sr-only">Zarezerwuj</span>
          </Button>
        </div>
      </form>
    </Form>
  )
}
