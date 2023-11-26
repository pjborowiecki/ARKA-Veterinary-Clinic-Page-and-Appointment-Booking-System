"use client"

import { type NavItem } from "@/types"

interface NavigationMobileProps {
  navItems: NavItem[]
}

export function NavigationMobile({
  navItems,
}: NavigationMobileProps): JSX.Element {
  return <div className="hidden">Navigation Mobile</div>
}
