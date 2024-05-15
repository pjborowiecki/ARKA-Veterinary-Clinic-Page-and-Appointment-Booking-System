"use client"

import { type NavItem } from "@/types"

interface NavigationMobileProps {
  navItems: NavItem[]
}

// TODO
export function NavigationMobile({
  navItems,
}: NavigationMobileProps): JSX.Element {
  console.log("Under construction", navItems)
  return <div className="hidden">Navigation Mobile</div>
}
