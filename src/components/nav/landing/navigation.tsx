"use client"

import Link from "next/link"
import { type NavItem } from "@/types"

import { cn } from "@/lib/utils"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"

interface NavigationProps {
  navItems: NavItem[]
}

export function Navigation({ navItems }: NavigationProps): JSX.Element {
  return (
    <NavigationMenu className="hidden md:flex">
      <NavigationMenuList className="relative flex items-center justify-center gap-[2.3vw] lg:gap-[2.4vw] 2xl:gap-[52px]">
        {navItems.map((item) => (
          <NavigationMenuItem key={item.title} asChild>
            <Link href={item.href} legacyBehavior passHref>
              <NavigationMenuLink
                className={cn(
                  navigationMenuTriggerStyle(),
                  "relative bg-transparent px-0 hover:bg-transparent focus:bg-transparent",
                  "z-[2] inline-block cursor-pointer font-medium tracking-wide md:text-[1.9vw] lg:text-[1.7vw] xl:text-[18px]",
                  "after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:origin-bottom-right after:scale-x-0 after:bg-greenNavbarHover after:opacity-[0.7] after:transition-all after:ease-out after:content-['']",
                  "hover:scale-[1.15] hover:after:origin-bottom-left hover:after:scale-x-100"
                )}
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
