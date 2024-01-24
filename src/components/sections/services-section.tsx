import Balancer from "react-wrap-balancer"

import { servicesSectionParagraphs } from "@/data/promo-text"
import { services } from "@/data/services"
import { ServiceCard } from "@/components/service-card"

export function ServicesSection(): JSX.Element {
  return (
    <section
      id="uslugi"
      className="w-full max-w-[2560px] bg-[url('/images/svg/radial-background.svg')] bg-cover bg-center bg-no-repeat"
    >
      <div className="mx-auto flex w-full max-w-[1440px] flex-col items-center px-5 md:px-6 lg:px-7">
        <div className="mt-12 flex flex-col md:mt-[-64px] md:grid md:grid-cols-2 lg:mt-[-96px]">
          <div className="flex flex-col items-center justify-center gap-8 md:gap-6">
            <h2 className="w-[90%] bg-gradient-to-br from-whiteGradientFrom to-whiteGradientTo bg-clip-text text-center font-[BalooTamma] font-bold leading-[1.05] text-transparent md:text-start">
              <span className="whitespace-nowrap text-[12vw] md:text-[5.8vw] w-1400:text-[80px]">
                Bogata oferta
              </span>
              <br />
              <span className="text-[7.6vw] md:whitespace-nowrap md:text-[3.71vw] w-1400:text-[51.2px]">
                i szeroki zakres usług
              </span>
            </h2>

            {servicesSectionParagraphs?.map((paragraph, index) => (
              <p
                key={index}
                className="w-[86%] text-center text-[4.8vw] leading-[150%] text-darkSectionText opacity-60 md:w-[90%] md:pr-[14.5%] md:text-start md:text-[1.7vw] xl:pr-[16%] w-1400:pr-[23%] w-1400:text-[22px]"
              >
                <Balancer>{paragraph.content}</Balancer>
              </p>
            ))}
          </div>

          <div className="flex items-center justify-center">
            <img
              src="/images/services-image.png"
              className="mb-8 ml-[9%] mt-4 size-full scale-[1.35] object-contain md:mb-0 md:ml-0 md:scale-[1.25] 2xl:scale-[1.35]"
              alt="pies na stole operacyjnym"
            />
          </div>
        </div>

        <div className="z-[4] mb-6 gap-x-[48px] gap-y-[56px] md:grid md:w-[97%] md:grid-cols-2 md:gap-x-4 md:gap-y-2 lg:grid-cols-3 lg:gap-8">
          {services.map((service, index) => (
            <ServiceCard service={service} key={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
