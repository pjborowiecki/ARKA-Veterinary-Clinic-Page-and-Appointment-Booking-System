import { generateTimeOptions } from "@/lib/utils"

export const TIME_INTERVAL = 30
export const TIME_OPTIONS = generateTimeOptions(TIME_INTERVAL)

export const DAYS = [
  {
    value: "monday",
    label: "Poniedziałek",
  },
  {
    value: "tuesday",
    label: "Wtorek",
  },
  {
    value: "wednesday",
    label: "Środa",
  },
  {
    value: "thursday",
    label: "Czwartek",
  },
  {
    value: "friday",
    label: "Piątek",
  },
  {
    value: "saturday",
    label: "Sobota",
  },
  {
    value: "sunday",
    label: "Niedziela",
  },
]
