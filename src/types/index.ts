// import type { Clinic } from "@/db/schema"

// export interface CuratedClinic {
//   id: Clinic["id"]
//   name: Clinic["name"]
//   description?: Clinic["description"]
//   bookingCount?: number
// }

export interface NavItem {
  title: string
  href: string
  disabled?: boolean
}

export interface Option {
  label: string
  value: string
  icon?: React.ComponentType<{ className?: string }>
}

export interface DataTableSearchableColumn<TData> {
  id: keyof TData
  title: string
}

export interface DataTableFilterableColumn<TData>
  extends DataTableSearchableColumn<TData> {
  options: Option[]
}
