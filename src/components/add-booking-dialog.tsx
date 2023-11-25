// "use client"

import {
  DialogContent,
  DialogFooter,
  DialogHeader,
} from "@/components/ui/dialog"
import { BookingAddForm } from "@/components/forms/booking/booking-add-form"

export function AddBookingDialog(): JSX.Element {
  return (
    <DialogContent className="bg-primary-foreground">
      <DialogHeader></DialogHeader>
      <BookingAddForm />
      <DialogFooter></DialogFooter>
    </DialogContent>
  )
}
