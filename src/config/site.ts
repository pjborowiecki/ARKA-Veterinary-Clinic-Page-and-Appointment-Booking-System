import type { MainNavItem } from "@/types"

export type SiteConfig = typeof siteConfig

const links = {
  facebook: "",
}

export const siteConfig = {
  name: "Arka",
  description: "",
  url: "https://arka-weterynaria.pl",
  ogImage: "https://arka-weterynaria.pl/opengraph-image.png",
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
  links: {
    facebook: links.facebook,
  },
}
