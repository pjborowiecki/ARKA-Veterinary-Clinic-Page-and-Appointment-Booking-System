import { type NavItem } from "@/types"

const links = {
  facebook: "",
  github:
    "https://github.com/pjborowiecki/ARKA-Veterinary-Clinic-Page-and-Appointment-Booking-System.git",
  openGraphImage: "https://arka-weterynaria.pl/opengraph-image.png",
  manifestFile: "https://saasyland.com/site.webmanifest",
}

export const siteConfig = {
  links,
  nameShort: "ARKA",
  nameLong: "Przychodnia weterynaryjna ARKA w Bochni",
  description: "",
  url: "https://arka-weterynaria.pl",
  ogImage: links.openGraphImage,
  author: "pjborowiecki",
  hostingRegion: "fra1",
  keywords: [
    "Przychodnia weterynaryjna",
    "Weterynarz",
    "Weterynaria",
    "Weterynaria Bochnia",
    "Weterynaria Brzesko",
    "Weterynaria Małopolska",
    "ARKA",
    "Piotr Surma",
  ],
  mainNavItems: [
    {
      title: "Przychodnia",
      href: "/#przychodnia",
    },
    {
      title: "Usługi",
      href: "/#uslugi",
    },
    {
      title: "Personel",
      href: "/#personel",
    },
    // {
    //   title: "Salon fryzur",
    //   href: "/#salon-fryzur",
    // },
    // {
    //   title: "Galeria",
    //   href: "/#galeria",
    // },
    {
      title: "Kontakt",
      href: "/#kontakt",
    },
  ] satisfies NavItem[],

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
  ] satisfies NavItem[],
}
