"use client"

import * as React from "react"
import Link from "next/link"
import { deleteBookingAction } from "@/actions/booking"
import { bookings, type Booking } from "@/db/schema"
import { DotsHorizontalIcon } from "@radix-ui/react-icons"
import { type ColumnDef } from "@tanstack/react-table"
import { toast } from "sonner"

import { catchError, formatDate } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { DataTable } from "@/components/data-table/data-table"
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header"

interface BookingsTableShellProps {
  data: Booking[]
  pageCount: number
  clinicId: number
}

export function BookingsTableShell({
  data,
  pageCount,
  clinicId,
}: BookingsTableShellProps) {
  const [isPending, startTransition] = React.useTransition()
  const [selectedRowIds, setSelectedRowIds] = React.useState<number[]>([])

  // Memoize the columns so they don't re-render on every render
  const columns = React.useMemo<ColumnDef<Booking, unknown>[]>(
    () => [
      {
        id: "select",
        header: ({ table }) => (
          <Checkbox
            checked={table.getIsAllPageRowsSelected()}
            onCheckedChange={(value) => {
              table.toggleAllPageRowsSelected(!!value)
              setSelectedRowIds((prev) =>
                prev.length === data.length ? [] : data.map((row) => row.id)
              )
            }}
            aria-label="Zaznacz wszystko"
            className="translate-y-[2px]"
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => {
              row.toggleSelected(!!value)
              setSelectedRowIds((prev) =>
                value
                  ? [...prev, row.original.id]
                  : prev.filter((id) => id !== row.original.id)
              )
            }}
            aria-label="Zaznacz wiersz"
            className="translate-y-[2px]"
          />
        ),
        enableSorting: false,
        enableHiding: false,
      },
      {
        accessorKey: "type",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Typ" />
        ),
        cell: ({ cell }) => {
          const types = Object.values(bookings.type.enumValues)
          const type = cell.getValue() as Booking["type"]

          if (!types.includes(type)) return null

          return (
            <Badge variant="outline" className="capitalize">
              {type}
            </Badge>
          )
        },
      },
      {
        accessorKey: "status",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Status" />
        ),
        cell: ({ cell }) => {
          const statuses = Object.values(bookings.status.enumValues)
          const status = cell.getValue() as Booking["status"]

          if (!statuses.includes(status)) return null

          return (
            <Badge variant="outline" className="capitalize">
              {status}
            </Badge>
          )
        },
      },
      {
        accessorKey: "slot",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Termin" />
        ),
      },
      {
        accessorKey: "firstName",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Imię" />
        ),
      },
      {
        accessorKey: "lastName",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Nazwisko" />
        ),
      },
      {
        accessorKey: "phone",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Telefon" />
        ),
      },
      {
        accessorKey: "email",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Email" />
        ),
      },
      {
        accessorKey: "message",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Wiadomość" />
        ),
      },
      {
        accessorKey: "createdAt",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Data utworzenia" />
        ),
        cell: ({ cell }) => formatDate(cell.getValue() as Date),
        enableColumnFilter: false,
      },
      {
        accessorKey: "updatedAt",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Data modyfikacji" />
        ),
        cell: ({ cell }) => formatDate(cell.getValue() as Date),
        enableColumnFilter: false,
      },
      {
        id: "actions",
        cell: ({ row }) => (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                aria-label="Open menu"
                variant="ghost"
                className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
              >
                <DotsHorizontalIcon className="h-4 w-4" aria-hidden="true" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[160px]">
              <DropdownMenuItem asChild>
                <Link href={`/admin/przychodnia/rezerwacje/${row.original.id}`}>
                  Edit
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href={`/rezerwacja/${row.original.id}`}>View</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => {
                  startTransition(() => {
                    row.toggleSelected(false)

                    toast.promise(
                      deleteBookingAction({
                        id: row.original.id,
                        clinicId,
                      }),
                      {
                        loading: "Usuwanie...",
                        success: () => "Rezerwacja pomyślnie usunięta",
                        error: (err: unknown) => catchError(err),
                      }
                    )
                  })
                }}
                disabled={isPending}
              >
                Usuń
                <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ),
      },
    ],
    [data, isPending, clinicId]
  )

  function deleteSelectedRows() {
    toast.promise(
      Promise.all(
        selectedRowIds.map((id) =>
          deleteBookingAction({
            id,
            clinicId,
          })
        )
      ),
      {
        loading: "Usuwanie...",
        success: () => {
          setSelectedRowIds([])
          return "Wybrane rezerwacje pomyślnie usunięte"
        },
        error: (err: unknown) => {
          setSelectedRowIds([])
          return catchError(err)
        },
      }
    )
  }

  return (
    <DataTable
      columns={columns}
      data={data}
      pageCount={pageCount}
      filterableColumns={[
        {
          id: "type",
          title: "Typ",
          options: bookings.type.enumValues.map((type) => ({
            label: `${type.charAt(0).toUpperCase()}${type.slice(1)}`,
            value: type,
          })),
        },
      ]}
      searchableColumns={[
        {
          id: "name",
          title: "names",
        },
      ]}
      newRowLink={`/admin/przychodnia/rezerwacje/dodaj`}
      deleteRowsAction={() => void deleteSelectedRows()}
    />
  )
}
