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
      title: "Godziny przyjęć",
      href: "/admin/przychodnia/godziny",
      icon: "availability",
      items: [],
    },
    {
      title: "Dni wolne",
      href: "/admin/przychodnia/dni-wolne",
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
