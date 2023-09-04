import Link from "next/link"

import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Dialog, DialogTrigger } from "@/components/ui/dialog"
import { AddBookingDialog } from "@/components/add-booking-dialog"

export function LandingMainNav() {
  return (
    <nav className="mx-auto flex w-full max-w-[1440px] items-center justify-between bg-transparent px-5 py-6 text-greenNavbarText transition-all duration-500 ease-in-out md:px-6 md:py-8 lg:py-9 w-1496:px-0">
      <Link href="/">
        <img
          src="/images/logo.png"
          alt="Arka logo"
          className="z-[2] h-full w-full cursor-pointer pr-[2px]"
        />
      </Link>

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
        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant="landingAppointment"
              className="group ml-10"
              size="action"
            >
              <span className="absolute h-0 w-0 rounded-full bg-white opacity-10 transition-all duration-300 ease-out group-hover:h-32 group-hover:w-full" />
              <span className="relative">Umów wizytę</span>
            </Button>
          </DialogTrigger>
          <AddBookingDialog />
        </Dialog>
      </div>
    </nav>
  )
}
