import Link from "next/link"

import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Shell } from "@/components/shells/shell"

export function LandingMainNav() {
  return (
    <Shell as="div" variant="landingFullWidth">
      <Shell
        as="nav"
        variant="landingConstrained"
        className="flex items-center justify-between bg-transparent py-[24px] text-greenNavbarText transition-all duration-500 ease-in-out md:py-[32px] lg:py-[36px] w-1496:px-0"
      >
        {/* Logo */}
        <Link href="/">
          <img
            src="/images/logo.png"
            alt="Arka logo"
            className="z-[2] h-full w-full cursor-pointer pr-[2px]"
          />
        </Link>

        {/* Right-hand Side */}
        <div className="flex flex-1 items-center justify-end whitespace-nowrap">
          {/* Nav items */}
          <ul className="hidden items-center justify-center gap-[2.3vw] md:flex lg:gap-[2.4vw] 2xl:gap-[56px]">
            {siteConfig?.mainNav?.map((navLink) => (
              <li
                key={navLink.title}
                className={cn(
                  "z-[2] inline-block cursor-pointer font-medium tracking-wide hover:scale-[1.15] hover:after:origin-bottom-left hover:after:scale-x-100 md:text-[1.9vw] lg:text-[1.7vw] xl:text-[18px]",
                  "after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:origin-bottom-right after:scale-x-0 after:bg-greenNavbarHover after:opacity-[0.7] after:transition-transform after:ease-out after:content-['']"
                )}
                // onClick={handleScrollToSection.bind(null, link.id)}
              >
                {navLink.title}
              </li>
            ))}
          </ul>

          {/* Appointment Button */}
          <Button
            variant="landingAppointment"
            className="group ml-[40px]"
            size="action"
          >
            <span className="absolute h-0 w-0 rounded-full bg-white opacity-10 transition-all duration-300 ease-out group-hover:h-32 group-hover:w-full" />
            <span className="relative">Umów wizytę</span>
          </Button>
        </div>
      </Shell>
    </Shell>
  )
}
