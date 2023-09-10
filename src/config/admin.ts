import { type SidebarNavItem } from "@/types"

export interface AdminConfigProps {
  sidebarNav: SidebarNavItem[]
}

export const adminConfig: AdminConfigProps = {
  sidebarNav: [
    {
      title: "Przychodnia",
      href: "/admin/przychodnia",
      icon: "clinic",
      items: [],
    },
    {
      title: "Rezerwacje",
      href: "/admin/przychodnia/rezerwacje",
      icon: "calendar",
      items: [],
    },
    {
      title: "Dostępność",
      href: "/admin/przychodnia/dostepnosc",
      icon: "availability",
      items: [],
    },
    {
      title: "Profil",
      href: "/admin/profil",
      icon: "user",
      items: [],
    },
  ],
}
