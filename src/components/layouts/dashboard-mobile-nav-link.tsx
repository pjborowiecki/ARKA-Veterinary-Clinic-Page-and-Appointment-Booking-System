import Link from "next/link"

import { cn } from "@/lib/utils"

interface MobileNavLinkProps {
  children?: React.ReactNode
  href: string
  disabled?: boolean
  pathname: string
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export function MobileNavLink({
  children,
  href,
  disabled,
  pathname,
  setIsOpen,
}: MobileNavLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        "hover:text-foreground/50 text-foreground transition-colors",
        pathname === href && "text-foreground",
        disabled && "pointer-events-none opacity-60"
      )}
      onClick={() => setIsOpen(false)}
    >
      {children}
    </Link>
  )
}
