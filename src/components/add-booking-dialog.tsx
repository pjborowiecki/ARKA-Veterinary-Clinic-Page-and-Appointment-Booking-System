// "use client"

import {
  DialogContent,
  DialogFooter,
  DialogHeader,
} from "@/components/ui/dialog"
import { AddBookingForm } from "@/components/forms/add-booking-form"

export function AddBookingDialog() {
  return (
    <DialogContent className="bg-primary-foreground">
      <DialogHeader></DialogHeader>
      <AddBookingForm />
      <DialogFooter></DialogFooter>
    </DialogContent>
  )
}
