import { env } from "@/env.mjs"
import { clsx, type ClassValue } from "clsx"
import { addMinutes, format } from "date-fns"
import dayjs from "dayjs"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs))
}

export function formatDate(date: Date | string): string {
  return dayjs(date).format("MMMM D, YYYY")
}

export function formatTime(date: Date | string) {
  return dayjs(date).format("HH:mm")
}

export function isMacOs(): boolean {
  return window.navigator.userAgent.includes("Mac")
}

export function scrollToSection(sectionName: string): void {
  document
    ?.getElementById(`${sectionName}`)
    ?.scrollIntoView({ behavior: "smooth" })
}

export function slugify(str: string): string {
  return str
    .toLowerCase()
    .replace(/ /g, "-")
    .replace(/[^\w-]+/g, "")
    .replace(/--+/g, "-")
}

export function toSentenceCase(str: string): string {
  return str
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (str) => str.toUpperCase())
}

export function generateTimeOptions(interval: number): string[] | null {
  if (Number.isInteger(interval) && interval >= 0 && interval <= 60) {
    const timeList: string[] = []
    let currentTime: Date = new Date(0, 0, 0, 0, 0, 0)

    while (currentTime <= new Date(0, 0, 0, 23, 59, 59)) {
      timeList.push(format(currentTime, "HH:mm"))
      currentTime = addMinutes(currentTime, interval)
    }

    return timeList
  } else {
    console.error(
      "Invalid interval. Please provide a positive integer between 0 and 60."
    )
    return null
  }
}

export function absoluteUrl(path: string): string {
  return `${env.NEXT_PUBLIC_APP_URL}${path}`
}

export function handleClickSecondaryButton() {}
