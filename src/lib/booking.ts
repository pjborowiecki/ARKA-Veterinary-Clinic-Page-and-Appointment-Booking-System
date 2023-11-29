import { type Booking, type BusinessHours } from "@/db/schema"

export function getDaysClosed(
  businessHours: BusinessHours,
  daysOfWeek: string[]
): number[] {
  try {
    const daysClosed: number[] = []

    for (const day of daysOfWeek) {
      const status = businessHours[`${day}Status` as keyof BusinessHours]
      if (status === "zamknięte") {
        daysClosed.push(daysOfWeek.indexOf(day))
      }
    }

    return daysClosed
  } catch (error) {
    console.error(error)
    throw new Error("Błąd przy wczytywaniu dni wolnych od pracy")
  }
}

export function getTimeOptions(
  selectedDate: Date,
  bookingType: string,
  existingBookings: Booking[],
  businessHours: BusinessHours,
  timeInterval: number
): string[] {
  try {
    const nowLocally = new Date()

    const selectedDay =
      selectedDate &&
      selectedDate
        .toLocaleDateString("en-US", { weekday: "long" })
        .toLowerCase()

    const openingTime =
      businessHours[`${selectedDay}Opening` as keyof BusinessHours]

    const closingTime =
      businessHours[`${selectedDay}Closing` as keyof BusinessHours]

    const currentTime = `${String(nowLocally.getHours()).padStart(
      2,
      "0"
    )}:${String(nowLocally.getMinutes()).padStart(2, "0")}`

    if (
      openingTime &&
      closingTime &&
      currentTime &&
      typeof openingTime === "string" &&
      typeof closingTime === "string" &&
      typeof currentTime === "string"
    ) {
      const timeOptions: string[] = []

      const filteredBookings =
        existingBookings
          ?.filter((booking) => booking.date)
          ?.filter((booking) => {
            const bookingDate = new Date(booking.date)
            return (
              booking.type === bookingType &&
              bookingDate.toDateString() === selectedDate.toDateString()
            )
          }) || []

      const currentSlot = new Date(selectedDate)
      currentSlot.setHours(Number(openingTime.split(":")[0]))
      currentSlot.setMinutes(Number(openingTime.split(":")[1]))

      while (currentSlot.getHours() < Number(closingTime.split(":")[0])) {
        const currentSlotString = `${String(currentSlot.getHours()).padStart(
          2,
          "0"
        )}:${String(currentSlot.getMinutes()).padStart(2, "0")}`

        const enoughAhead =
          currentSlot.getTime() > Date.now() + 2 * 60 * 60 * 1000
        const bookedAlready = filteredBookings.some(
          (booking) => booking.time === currentSlotString
        )

        if (enoughAhead && !bookedAlready) {
          timeOptions.push(currentSlotString)
        }

        currentSlot.setMinutes(currentSlot.getMinutes() + timeInterval)
      }

      return timeOptions
    }

    return []
  } catch (error) {
    console.error(error)
    return []
  }
}
