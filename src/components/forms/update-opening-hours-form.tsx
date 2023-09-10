"use client"

import * as React from "react"
import {zodResolver} from "@hookform/resolvers/zod"
import type {z} from "zod"
import {useForm} from "react-hook-form"
import {toast} from "sonner"

import {updateOpeningTimesAction} from "@/actions/availability"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  UncontrolledFormMessage,
} from "@/components/ui/form"
import {openingTimesSchema} from "@/lib/validations/availability"

type Inputs = Z.infer<typeof openingTimesSchema>

export function UpdateOpeningHoursForm {

  const form = useForm<Inputs>({})

    return (
        <Form {...form}>
            <form className="grid gap-4">
                <FormField control={form.control} />
            </form>

        </Form>
    )
}