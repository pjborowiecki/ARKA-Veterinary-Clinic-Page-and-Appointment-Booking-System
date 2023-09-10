import type { Clinic } from "@/db/schema"
import type { z } from "zod"

import type { userPrivateMetadataSchema } from "@/lib/validations/auth"
import type { Icons } from "@/components/icons"

export interface CuratedClinic {
  id: Clinic["id"]
  name: Clinic["name"]
  description?: Clinic["description"]
  bookingCount?: number
}

export interface NavItem {
  title: string
  href?: string
  disabled?: boolean
  external?: boolean
  icon?: keyof typeof Icons
  label?: string
  description?: string
}

export interface NavItemWithChildren extends NavItem {
  items: NavItemWithChildren[]
}

export interface NavItemWithOptionalChildren extends NavItem {
  items?: NavItemWithChildren[]
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

export type MainNavItem = NavItemWithOptionalChildren
export type SidebarNavItem = NavItemWithOptionalChildren

export type UserRole = z.infer<typeof userPrivateMetadataSchema.shape.role>
