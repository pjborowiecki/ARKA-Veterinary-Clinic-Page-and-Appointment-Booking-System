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
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"

interface NavigationProps {
  items?: NavItem[]
}

export function Navigation({ items }: NavigationProps): JSX.Element {
  return (
    <NavigationMenu className="hidden md:flex">
      <NavigationMenuList className="items-center gap-x-8 transition-all duration-300 ease-in-out">
        {items?.map((item) => (
          <NavigationMenuItem
            asChild
            key={item.title}
            className="font-semibold hover:underline"
          >
            <Link href={item.href} legacyBehavior passHref>
              <NavigationMenuLink
                href={item.href}
                className={cn(navigationMenuTriggerStyle(), "bg-transparent")}
              >
                {item.title}
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  )
}
