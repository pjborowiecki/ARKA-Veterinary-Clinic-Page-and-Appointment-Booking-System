import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { BookingAddForm } from "@/components/forms/booking/booking-add-form"

export default function AddBookingPage(): JSX.Element {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-greenGradientFrom to-greenGradientTo">
      <Card className="bg-primary-foreground px-2 pb-2 pt-8">
        <CardHeader className="text-center text-2xl font-bold">
          Nowa rezerwacja
        </CardHeader>
        <CardContent>
          <BookingAddForm />
        </CardContent>
      </Card>
    </div>
  )
}
