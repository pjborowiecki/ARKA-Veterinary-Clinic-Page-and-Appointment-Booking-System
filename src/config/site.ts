import type { MainNavItem } from "@/types"

export type SiteConfig = typeof siteConfig

const links = {
  facebook: "",
  github:
    "https://github.com/pjborowiecki/ARKA-Veterinary-Clinic-Page-and-Appointment-Booking-System.git",
}

export const siteConfig = {
  nameShort: "ARKA",
  nameLong: "Przychodnia weterynaryjna ARKA w Bochni",
  description: "",
  url: "https://arka-weterynaria.pl",
  ogImage: "https://arka-weterynaria.pl/og.jpg",
  mainNav: [
    {
      title: "Przychodnia",
      href: "#przychodnia",
    },
    {
      title: "Usługi",
      href: "#uslugi",
    },
    {
      title: "Personel",
      href: "#personel",
    },
    {
      title: "Salon fryzur",
      href: "#salon-fryzur",
    },
    {
      title: "Galeria",
      href: "#galeria",
    },
    {
      title: "Kontakt",
      href: "#kontakt",
    },
  ] satisfies MainNavItem[],
  mobileNav: [
    {
      title: "Przychodnia",
      href: "/admin/przychodnia",
    },
    {
      title: "Rezerwacje",
      href: "/admin/przychodnia/rezerwacje",
    },
    {
      title: "Godziny przyjęć",
      href: "/admin/przychodnia/godziny",
    },
    {
      title: "Dni wolne",
      href: "/admin/przychodnia/dni-wolne",
    },
    {
      title: "Profil",
      href: "/admin/profil",
    },
  ],
  links: {
    facebook: links.facebook,
  },
}
