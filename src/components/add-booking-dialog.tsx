import { getBusinessHours, getDatesUnavailable } from "@/actions/availability"
import { getAllBookings } from "@/actions/booking"

import {
  DialogContent,
  DialogFooter,
  DialogHeader,
} from "@/components/ui/dialog"
import { BookingAddForm } from "@/components/forms/booking/booking-add-form"

export async function AddBookingDialog(): Promise<JSX.Element> {
  const businessHours = await getBusinessHours()
  const datesUnavailable = await getDatesUnavailable()
  const bookings = await getAllBookings()

  return (
    <DialogContent className="bg-primary-foreground">
      <DialogHeader></DialogHeader>
      <BookingAddForm
        businessHours={businessHours}
        datesUnavailable={datesUnavailable}
        existingBookings={bookings}
      />
      <DialogFooter></DialogFooter>
    </DialogContent>
  )
}
