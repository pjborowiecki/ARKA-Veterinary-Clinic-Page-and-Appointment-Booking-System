import {
  ArrowDownIcon,
  ArrowUpIcon,
  CaretSortIcon,
  EyeNoneIcon,
} from "@radix-ui/react-icons"
import { type Column } from "@tanstack/react-table"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface DataTableColumnHeaderProps<TData, TValue>
  extends React.HTMLAttributes<HTMLDivElement> {
  column: Column<TData, TValue>
  title: string
}

export function DataTableColumnHeader<TData, TValue>({
  column,
  title,
  className,
}: DataTableColumnHeaderProps<TData, TValue>) {
  if (!column.getCanSort()) {
    return <div className={cn(className)}>{title}</div>
  }

  return (
    <div className={cn("flex items-center space-x-2", className)}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            aria-label={
              column.getIsSorted() === "desc"
                ? `Sortowanie malejące. Kliknij by sortować rosnąco`
                : column.getIsSorted() === "asc"
                ? `Sortowanie rosnące. Kliknij by sortować malejąco`
                : `Brak sortowania. Kliknij by sortować rosnąco`
            }
            variant="ghost"
            size="sm"
            className="-ml-3 h-8 data-[state=open]:bg-accent"
          >
            <span>{title}</span>
            {column.getIsSorted() === "desc" ? (
              <ArrowDownIcon className="ml-2 h-4 w-4" aria-hidden="true" />
            ) : column.getIsSorted() === "asc" ? (
              <ArrowUpIcon className="ml-2 h-4 w-4" aria-hidden="true" />
            ) : (
              <CaretSortIcon className="ml-2 h-4 w-4" aria-hidden="true" />
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <DropdownMenuItem
            aria-label="Srtowanie rosnące"
            onClick={() => column.toggleSorting(false)}
          >
            <ArrowUpIcon
              className="text-muted-foreground/70 mr-2 h-3.5 w-3.5"
              aria-hidden="true"
            />
            Rosnąco
          </DropdownMenuItem>
          <DropdownMenuItem
            aria-label="Sortowanie malejące"
            onClick={() => column.toggleSorting(true)}
          >
            <ArrowDownIcon
              className="text-muted-foreground/70 mr-2 h-3.5 w-3.5"
              aria-hidden="true"
            />
            Malejąco
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            aria-label="Ukryj kolumnę"
            onClick={() => column.toggleVisibility(false)}
          >
            <EyeNoneIcon
              className="text-muted-foreground/70 mr-2 h-3.5 w-3.5"
              aria-hidden="true"
            />
            Ukryj
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
