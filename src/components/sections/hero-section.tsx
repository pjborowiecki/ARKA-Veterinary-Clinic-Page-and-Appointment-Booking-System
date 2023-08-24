import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Dialog, DialogTrigger } from "@/components/ui/dialog"
import { AddBookingDialog } from "@/components/add-booking-dialog"
import { LandingMainNav } from "@/components/layouts/landing-main-nav"
// import { LandingMobileNav } from "@/components/layouts/landing-mobile-nav"
import { Shell } from "@/components/shells/shell"

export function HeroSection() {
  return (
    <Shell
      as="header"
      variant="landingFullWidth"
      className="overflow-hidden"
      id="hero"
    >
      <Shell
        as="div"
        variant="landingFullWidth"
        className="bg-peach bg-[url('/images/navbar-and-hero-background.png')] bg-cover bg-right bg-no-repeat md:pb-[40px] xl:bg-contain"
      >
        <LandingMainNav />

        {/* Navigation on mobile */}
        {/* <LandingMobileNav /> */}

        {/* Hero content */}
        <Shell
          as="section"
          variant="landingConstrained"
          className="flex h-full grid-cols-12 flex-col-reverse px-[20px] transition-all duration-500 ease-in-out md:grid md:pl-[58px] md:pr-[0px] lg:pl-[64px]"
        >
          {/* Hero buttons on Mobile */}
          <div className="mb-[6vw] mt-[8vw] flex flex-col items-center gap-[4vw] whitespace-nowrap md:hidden">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="landingPrimary" size="action">
                  Umów wizytę
                </Button>
              </DialogTrigger>
              <AddBookingDialog />
            </Dialog>

            <Button
              variant="landingSecondary"
              size="action"
              // onClick={handleClickSecondaryButton}
            >
              Nagłe Wypadki
            </Button>
          </div>

          {/* Hero text side */}
          <div className="w-full overflow-visible md:col-start-1 md:col-end-6 md:mb-[-64px] md:grid lg:mb-[-84px] xl:mb-[-108px] 2xl:mb-[-128px]">
            <div className="flex w-full flex-col items-center justify-center gap-[5vw] text-center md:mb-[8px] md:items-start md:gap-[2vw] md:text-start lg:mb-[28px] xl:mb-[52px] w-1400:gap-[36px]">
              <h1 className="mt-[8vw] w-full bg-gradient-to-br from-greenGradientFrom to-greenGradientTo bg-clip-text font-[BalooTamma] font-bold leading-[1.05] text-transparent md:mt-[0px]">
                {/* Main heading */}
                <span className="text-[15vw] md:text-[9.2vw] 2xl:text-[138px]">
                  Przychodnia
                </span>
                <br />
                <span className="text-[11vw] md:text-[6.9vw] 2xl:text-[104px]">
                  weterynaryjna
                </span>
              </h1>

              {/* Subheading */}
              <h3 className="w-full px-[10%] font-[Baloo] text-[5.6vw] leading-[120%] text-secondaryGreen opacity-80 md:pl-[0px] md:pr-[12%] md:text-[2.3vw] md:leading-[140%] lg:leading-[130%] 2xl:text-[34px]">
                <span className="text-[5.6vw] md:text-[2.49vw] 2xl:text-[37px]">
                  Twoje zwierzaki zasługują na najlepsze.{" "}
                </span>{" "}
                Właśnie dlatego istnieje Arka. Zapraszamy!
              </h3>

              {/* Buttons */}
              <div className="mt-[8px] hidden w-full items-center gap-[1vw] whitespace-nowrap md:flex">
                {/* Primary Button */}
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="landingPrimary" size="action">
                      Umów wizytę
                    </Button>
                  </DialogTrigger>
                  <AddBookingDialog />
                </Dialog>

                {/* Secondary Button */}
                <Button
                  variant="landingSecondary"
                  size="action"
                  // onClick={handleClickSecondaryButton}
                >
                  Nagłe wypadki
                </Button>
              </div>
            </div>
          </div>

          {/* Hero image side */}
          <div className="relative block h-full w-full justify-center overflow-visible md:col-start-6 md:col-end-13 md:mb-[-64px] md:grid lg:mb-[-84px] xl:mb-[-108px] 2xl:mb-[-128px]">
            {/* Cat and dog image  */}
            <img
              src="/images/hero-image.png"
              className="z-[2] ml-[-8px] mt-[32px] h-full w-full scale-[1.2] object-contain sm:scale-[1.1] md:mt-[0px]"
              alt="A dog and a cat sat next to each other"
            />
            {/* Cat and dog image  */}{" "}
            <img
              src="/images/doctors.png"
              className="absolute hidden md:bottom-[-60px] md:left-[-106px] md:block lg:bottom-[-40px] lg:left-[-100px] xl:bottom-[-46px] xl:left-[-70px]"
              alt="Doctor names"
            />
            {/* Location pill */}
            <div
              className={cn(
                "absolute right-0 top-[50%] z-[3] mr-[20px] hidden h-[68px] w-[215px] cursor-pointer items-center justify-center gap-[8px] px-[24px] py-[16px] hover:scale-[1.1] md:flex 2xl:right-[-16px] 2xl:top-[55%]",
                "location-pill"
              )}
              // onClick={handleScrollToSection.bind(null, "kontakt")}
            >
              <img
                src="/images/location-marker.png"
                alt="Location marker icon"
                className="h-[24px] w-[24px]"
              />
              <p className="text-[12px] font-bold tracking-wide text-locationText opacity-80">
                Ul. Brodzińskiego 2c, 32-700 Bochnia
              </p>
            </div>
          </div>
        </Shell>
      </Shell>

      {/* Hero section bottom wave pattern */}
      <div className="w-full">
        <img
          src="/images/hero-bottom-wave.png"
          alt="Hero section bottom wave pattern"
          className="h-full w-full object-cover"
        />
      </div>
    </Shell>
  )
}
