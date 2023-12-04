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
    },
    {
      title: "Rezerwacje",
      href: "/admin/przychodnia/rezerwacje",
      icon: "calendar",
    },
    {
      title: "Godziny przyjęć",
      href: "/admin/przychodnia/godziny",
      icon: "availability",
    },
    {
      title: "Dni wolne",
      href: "/admin/przychodnia/dni-wolne",
      icon: "availability",
    },
    {
      title: "Profil",
      href: "/admin/profil",
      icon: "user",
    },
  ],
}
