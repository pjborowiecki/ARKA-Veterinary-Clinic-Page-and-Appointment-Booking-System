"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import type { NavItem } from "@/types"

import { siteConfig } from "@/config/site"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Icons } from "@/components/icons"
import { MobileNavLink } from "@/components/layouts/admin-mobile-nav-link"

interface AdminMobileNavProps {
  items?: NavItem[]
}

export function AdminMobileNav({ items }: AdminMobileNavProps) {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = React.useState(false)

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 lg:hidden"
        >
          <Icons.menu className="h-6 w-6" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="bg-primary-foreground pl-1 pr-0">
        <div className="px-7">
          <Link
            aria-label="Home"
            href="/"
            className="flex items-center"
            onClick={() => setIsOpen(false)}
          >
            <span className="font-bold">{siteConfig.nameShort}</span>
          </Link>
        </div>
        <ScrollArea className="my-4 h-[calc(100vh-8rem)] pb-10 pl-6">
          <div className="flex flex-col space-y-2 pl-1 pr-7 text-lg capitalize">
            {items?.map((item, index) => (
              <MobileNavLink
                key={index}
                href={String(item.href)}
                pathname={pathname}
                setIsOpen={setIsOpen}
                disabled={item.disabled}
              >
                {item.title}
              </MobileNavLink>
            ))}
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  )
}
