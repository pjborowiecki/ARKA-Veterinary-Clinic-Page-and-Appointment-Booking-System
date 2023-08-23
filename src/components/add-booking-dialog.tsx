"use client"

import {
  DialogContent,
  DialogFooter,
  DialogHeader,
} from "@/components/ui/dialog"
import { AddBookingForm } from "@/components/forms/add-booking-form"

interface AddBookingDialogProps {}

export function AddBookingDialog({}: AddBookingDialogProps) {
  return (
    <DialogContent>
      <DialogHeader></DialogHeader>
      <AddBookingForm />
      <DialogFooter></DialogFooter>
    </DialogContent>
  )
}
