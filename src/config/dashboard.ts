import { type SidebarNavItem } from "@/types"

export interface DashboardConfig {
  sidebarNav: SidebarNavItem[]
}

export const dashboardConfig: DashboardConfig = {
  sidebarNav: [
    {
      title: "Rezerwacje",
      href: "/rezerwacje",
      icon: "calendar",
      items: [],
    },
    {
      title: "Dostępność",
      href: "/dostepnosc",
      icon: "availability",
      items: [],
    },
    {
      title: "Profil",
      href: "/profil",
      icon: "user",
      items: [],
    },
  ],
}
