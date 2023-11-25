import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

// TODO: Structure and styyle the skeletons
export default function DatesUnavailabileLoading(): JSX.Element {
  return (
    <Card as="section">
      <CardHeader className="my-2">
        <CardTitle className="text-2xl">Dni wolne</CardTitle>
        <CardDescription></CardDescription>
      </CardHeader>
      <CardContent>
        <Skeleton className="" />
      </CardContent>
    </Card>
  )
}
