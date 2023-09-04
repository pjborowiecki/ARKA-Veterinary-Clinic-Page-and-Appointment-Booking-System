"use client"

import * as React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import type { z } from "zod"

import { enquiryEmailSchema } from "@/lib/validations/email"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  UncontrolledFormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Icons } from "@/components/icons"

type Inputs = z.infer<typeof enquiryEmailSchema>

export function ContactForm() {
  const [isPending, startTransition] = React.useTransition()

  const form = useForm<Inputs>({
    resolver: zodResolver(enquiryEmailSchema),
    defaultValues: {
      name: "",
      surname: "",
      email: "",
      phone: "",
      message: "",
      rodo: false,
    },
  })

  function onSubmit(data: Inputs) {
    startTransition(() => {
      try {
        console.log(data)
      } catch (err) {
        console.error(err)
      }
    })
  }

  return (
    <Form {...form}>
      <form
        className="grid w-full gap-[6vw] md:gap-6"
        onSubmit={(...args) => void form.handleSubmit(onSubmit)(...args)}
      >
        <div className="flex flex-col gap-[6vw] md:grid md:grid-cols-2 md:gap-4">
          {/* Name */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="text-[4.4vw] font-medium text-greenContactFormText md:text-sm">
                  Imię
                </FormLabel>
                <FormControl>
                  <Input
                    aria-invalid={!!form.formState.errors.name}
                    placeholder="Jan"
                    {...field}
                    className="placeholder:text-input/70 h-[8vw] min-h-[40px] bg-transparent text-input md:h-10"
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
              <FormItem className="w-full">
                <FormLabel className="text-[4.4vw] font-medium text-greenContactFormText md:text-sm">
                  Nazwisko
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Kowalski"
                    {...field}
                    className="placeholder:text-input/70 h-[8vw] min-h-[40px] bg-transparent text-input md:h-10"
                  />
                </FormControl>
                <UncontrolledFormMessage
                  message={form.formState.errors.surname?.message}
                />
              </FormItem>
            )}
          />
        </div>

        <div className="flex flex-col gap-[6vw] md:grid md:grid-cols-2 md:gap-4">
          {/* Phone */}
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="text-[4.4vw] font-medium text-greenContactFormText md:text-sm">
                  Telefon
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="515 509 747"
                    {...field}
                    className="placeholder:text-input/70 h-[8vw] min-h-[40px] bg-transparent text-input md:h-10"
                  />
                </FormControl>
                <UncontrolledFormMessage
                  message={form.formState.errors.phone?.message}
                />
              </FormItem>
            )}
          />

          {/* Email */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="text-[4.4vw] font-medium text-greenContactFormText md:text-sm">
                  Email
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="jankowalski@gmail.com"
                    {...field}
                    className="placeholder:text-input/70 h-[8vw] min-h-[40px] bg-transparent text-input md:h-10"
                  />
                </FormControl>
                <UncontrolledFormMessage
                  message={form.formState.errors.email?.message}
                />
              </FormItem>
            )}
          />
        </div>

        {/* Message */}
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel className="text-[4.4vw] font-medium text-greenContactFormText md:text-sm">
                Wiadomość
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Wiadomość (opcjonalnie)"
                  {...field}
                  className="h-[60vw] resize-none rounded-md bg-transparent text-muted placeholder:text-input md:h-[160px] w-1400:h-[224px]"
                />
              </FormControl>
              <UncontrolledFormMessage
                message={form.formState.errors.message?.message}
              />
            </FormItem>
          )}
        />

        {/* Rodo */}
        <FormField
          control={form.control}
          name="rodo"
          render={({ field }) => (
            <FormItem className="">
              <div className="flex items-center gap-3">
                <FormControl className="">
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    className="h-[6vw] w-[6vw] rounded border-gray-300 focus-visible:ring-ring md:h-[2.6vw] md:w-[2.6vw] lg:h-[2vw] lg:w-[2vw] w-1400:h-[20px] w-1400:w-[20px]"
                  />
                </FormControl>
                <FormLabel className="text-[3.2vw] text-greenContactFormText md:text-xs">
                  Zgodnie z klauzulą Rodo, wyrażam zgodę na przetwarzanie moich
                  danych osobowych w celu realizacji usługi.
                </FormLabel>
              </div>
            </FormItem>
          )}
        />

        {/* Button */}
        <div className="flex w-full items-center justify-center pt-[4vw] md:justify-end md:pt-[2vw]">
          <Button variant="landingContact" size="contact" disabled={isPending}>
            {isPending && (
              <Icons.spinner className="mr-2 h-4 w-4" aria-hidden="true" />
            )}
            Wyślij
            <span className="sr-only">Wyślij</span>
            <Icons.arrowRight
              className="h-[4.8vw] w-[4.8vw] md:h-[2vw] md:w-[2vw] lg:h-[18px] lg:w-[18px]"
              aria-hidden="true"
            />
          </Button>
        </div>
      </form>
    </Form>
  )
}
