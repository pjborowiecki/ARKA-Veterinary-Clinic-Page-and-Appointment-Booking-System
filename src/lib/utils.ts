import { isClerkAPIResponseError } from "@clerk/nextjs"
import { clsx, type ClassValue } from "clsx"
import dayjs from "dayjs"
import { toast } from "sonner"
import { twMerge } from "tailwind-merge"
import * as z from "zod"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: Date | string) {
  return dayjs(date).format("MMMM D, YYYY")
}

export function formatTime(date: Date | string) {
  return dayjs(date).format("HH:mm")
}

export function catchError(err: unknown) {
  if (err instanceof z.ZodError) {
    const errors = err.issues.map((issue) => {
      return issue.message
    })
    return toast(errors.join("\n"))
  } else if (err instanceof Error) {
    return toast(err.message)
  } else {
    return toast("Coś poszło nie tak. Spróbuj ponownie")
  }
}

export function catchClerkError(error: unknown) {
  const unknownErr = "Coś poszło nie tak. Spróbuj ponownie"

  if (error instanceof z.ZodError) {
    const errors = error.issues.map((issue) => {
      return issue.message
    })
    return toast(errors.join("\n"))
  } else if (isClerkAPIResponseError(error)) {
    return toast.error(error.errors[0]?.longMessage ?? unknownErr)
  } else {
    return toast.error(unknownErr)
  }
}

export function isMacOs() {
  return window.navigator.userAgent.includes("Mac")
}

export function handleClickSecondaryButton() {}

export function scrollToSection(sectionName: string) {
  document
    ?.getElementById(`${sectionName}`)
    ?.scrollIntoView({ behavior: "smooth" })
}
