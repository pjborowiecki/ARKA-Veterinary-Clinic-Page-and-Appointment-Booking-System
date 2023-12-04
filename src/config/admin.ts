import { type AdminNavItem } from "@/types"

export interface AdminConfigProps {
  sidebarNav: AdminNavItem[]
}

export const adminConfig: AdminConfigProps = {
  sidebarNav: [
    {
      title: "Przychodnia",
      href: "/admin/przychodnia",
    },
    {
      title: "Rezerwacje",
      href: "/admin/rezerwacje",
    },
    {
      title: "Dostępność",
      href: "/admin/dostepnosc",
    },
    {
      title: "Profil",
      href: "/admin/profil",
    },
  ] satisfies AdminNavItem[],
}
