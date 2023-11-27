import {
  type Booking,
  type BusinessHours,
  type DateUnavailable,
} from "@/db/schema"
import dayjs from "dayjs"

export function isDateUnavailable(
  date: Date,
  datesUnavailable: DateUnavailable[]
) {
  return (
    datesUnavailable &&
    datesUnavailable.some((unavailableDate) =>
      dayjs(date)
        .startOf("day")
        .isSame(dayjs(unavailableDate.date).startOf("day"))
    )
  )
}

export function isDateBooked(date: Date, existingBookings: Booking) {}

export function isBusinessHour(date: Date, businessHours: BusinessHours) {}
