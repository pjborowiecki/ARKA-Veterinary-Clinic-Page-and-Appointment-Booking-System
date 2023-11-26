import Link from "next/link"

import { siteConfig } from "@/config/site"
import { Button } from "@/components/ui/button"
import { Dialog, DialogTrigger } from "@/components/ui/dialog"
import { AddBookingDialog } from "@/components/add-booking-dialog"
import { Navigation } from "@/components/nav/landing/navigation"
import { NavigationMobile } from "@/components/nav/landing/navigation-mobile"

export function Header(): JSX.Element {
  return (
    <header className="mx-auto flex w-full max-w-[1440px] items-center justify-between bg-transparent px-5 py-6 text-greenNavbarText transition-all duration-500 ease-in-out md:px-6 md:py-8 lg:py-9 w-1496:px-0">
      <Link href="/">
        <img
          src="/images/logo.png"
          alt="Arka logo"
          className="z-[2] h-full w-full cursor-pointer pr-[2px]"
        />
      </Link>
      <div className="flex flex-1 items-center justify-end whitespace-nowrap">
        <Navigation navItems={siteConfig.mainNavItems} />

        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant="landingAppointment"
              className="group"
              size="action"
            >
              <span
                className="absolute h-0 w-0 rounded-full bg-white opacity-10 transition-all duration-300 ease-out group-hover:h-32 group-hover:w-full"
                aira-hidden="true"
              />
              <span aria-label="Umów wizytę" className="relative">
                Umów wizytę
              </span>
            </Button>
          </DialogTrigger>
          <AddBookingDialog />
        </Dialog>

        <NavigationMobile navItems={siteConfig.mainNavItems} />
      </div>
    </header>
  )
}
