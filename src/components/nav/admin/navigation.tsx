"use client"

import * as React from "react"
import Link from "next/link"
import type { NavItem } from "@/types"

import { cn } from "@/lib/utils"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu"

interface NavigationProps {
  items?: NavItem[]
}

export function Navigation({ items }: NavigationProps): JSX.Element {
  return (
    <NavigationMenu>
      <NavigationMenuList className="hidden items-center gap-x-8 transition-all duration-300 ease-in-out lg:flex">
        {items?.map((item) => (
          <NavigationMenuItem
            asChild
            key={item.title}
            className="font-semibold hover:underline"
          >
            <Link href={item.href} legacyBehavior passHref>
              <NavigationMenuLink href={item.href}>
                {item.title}
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  )
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, href, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          ref={ref}
          href={String(href)}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"
