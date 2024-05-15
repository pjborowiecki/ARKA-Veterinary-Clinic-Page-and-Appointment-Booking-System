import Link from "next/link"

import { cn } from "@/lib/utils"

import { Button, buttonVariants } from "@/components/ui/button"
import { Header } from "@/components/nav/landing/header"

interface HeroSectionProps {
  address: string | undefined
}

export function HeroSection({ address }: HeroSectionProps): JSX.Element {
  return (
    <header className="overflow-hidden" id="hero">
      <div className="w-full max-w-[2560px] bg-peach bg-[url('/images/navbar-and-hero-background.png')] bg-cover bg-right bg-no-repeat md:pb-10 xl:bg-contain">
        <Header />

        <section className="mx-auto flex size-full max-w-[1440px] grid-cols-12 flex-col-reverse px-5 transition-all duration-500 ease-in-out md:grid md:pl-[58px] md:pr-0 lg:pl-[64px]">
          {/* Hero buttons on Mobile */}
          <div className="mb-[6vw] mt-[8vw] flex flex-col items-center gap-[4vw] whitespace-nowrap md:hidden">
            <Link
              href="/rezerwacja"
              className={cn(
                buttonVariants({
                  variant: "landingPrimary",
                  size: "action",
                }),
                "rounded-full"
              )}
            >
              Umów wizytę
            </Link>
            <Button
              variant="landingSecondary"
              size="action"
              // onClick={handleClickSecondaryButton}
            >
              Nagłe Wypadki
            </Button>
          </div>

          <div className="w-full overflow-visible md:col-start-1 md:col-end-6 md:mb-[-64px] md:grid lg:mb-[-84px] xl:mb-[-108px] 2xl:mb-[-128px]">
            <div className="flex w-full flex-col items-center justify-center gap-[5vw] text-center md:mb-2 md:items-start md:gap-[2vw] md:text-start lg:mb-7 xl:mb-[52px] w-1400:gap-9">
              <h1 className="mt-[8vw] w-full bg-gradient-to-br from-greenGradientFrom to-greenGradientTo bg-clip-text font-[BalooTamma] font-bold leading-[1.05] text-transparent md:mt-0">
                <span className="text-[15vw] md:text-[9.2vw] 2xl:text-[138px]">
                  Przychodnia
                </span>
                <br />
                <span className="text-[11vw] md:text-[6.9vw] 2xl:text-[104px]">
                  weterynaryjna
                </span>
              </h1>

              <h3 className="w-full px-[10%] font-[Baloo] text-[5.6vw] leading-[120%] text-secondaryGreen opacity-80 md:pl-0 md:pr-[12%] md:text-[2.3vw] md:leading-[140%] lg:leading-[130%] 2xl:text-[34px]">
                <span className="text-[5.6vw] md:text-[2.49vw] 2xl:text-[37px]">
                  Twoje zwierzaki zasługują na najlepsze.{" "}
                </span>{" "}
                Właśnie dlatego istnieje Arka. Zapraszamy!
              </h3>

              <div className="mt-2 hidden w-full items-center gap-[1vw] whitespace-nowrap md:flex">
                <Link
                  href="/rezerwacja"
                  className={cn(
                    buttonVariants({
                      variant: "landingPrimary",
                      size: "action",
                    }),
                    "rounded-full"
                  )}
                >
                  Umów wizytę
                </Link>

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

          <div className="relative block size-full justify-center overflow-visible md:col-start-6 md:col-end-13 md:mb-[-64px] md:grid lg:mb-[-84px] xl:mb-[-108px] 2xl:mb-[-128px]">
            <img
              src="/images/hero-image.png"
              className="z-[2] ml-[-8px] mt-[32px] size-full scale-[1.2] object-contain sm:scale-110 md:mt-0"
              alt="A dog and a cat sat next to each other"
            />
            <img
              src="/images/doctors.png"
              className="absolute hidden md:bottom-[-60px] md:left-[-106px] md:block lg:bottom-[-40px] lg:left-[-100px] xl:bottom-[-46px] xl:left-[-70px]"
              alt="Doctor names"
            />
            <div
              className={cn(
                "absolute right-0 top-1/2 z-[3] mr-[20px] hidden h-[68px] w-[215px] cursor-pointer items-center justify-center gap-[8px] px-[24px] py-[16px] hover:scale-110 md:flex 2xl:right-[-16px] 2xl:top-[55%]",
                "location-pill"
              )}
              // onClick={handleScrollToSection.bind(null, "kontakt")}
            >
              <img
                src="/images/location-marker.png"
                alt="Location marker icon"
                className="size-[24px]"
              />
              <p className="text-[12px] font-bold tracking-wide text-locationText opacity-80">
                Ul. {address}
              </p>
            </div>
          </div>
        </section>
      </div>

      <div className="w-full">
        <img
          src="/images/hero-bottom-wave.png"
          alt="Hero section bottom wave pattern"
          className="size-full object-cover"
        />
      </div>
    </header>
  )
}
