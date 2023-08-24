import { servicesSectionParagraphs } from "@/data/promo-text"
import { services } from "@/data/services"

import { ServiceCard } from "@/components/service-card"
import { Shell } from "@/components/shells/shell"

export function ServicesSection() {
  return (
    <Shell
      as="section"
      variant="landingFullWidth"
      className="bg-[url('/images/svg/radial-background.svg')] bg-cover bg-center bg-no-repeat"
      id="services"
    >
      <Shell
        as="div"
        variant="landingConstrained"
        className="flex flex-col items-center"
      >
        <div className="mt-[48px] flex flex-col md:mt-[-64px] md:grid md:grid-cols-2 lg:mt-[-96px]">
          <div className="flex flex-col items-center justify-center gap-[32px] md:gap-[24px]">
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
                {paragraph.content}
              </p>
            ))}
          </div>

          <div className="flex items-center justify-center">
            <img
              src="/images/services-image.png"
              className="mb-[32px] ml-[9%] mt-[16px] h-full w-full scale-[1.35] object-contain md:mb-[0px] md:ml-[0px] md:scale-[1.25] 2xl:scale-[1.35]"
              alt="pies na stole operacyjnym"
            />
          </div>
        </div>

        <div className="z-[4] mb-[24px] gap-x-[48px] gap-y-[56px] md:grid md:w-[97%] md:grid-cols-2 md:gap-x-[16px] md:gap-y-[8px] lg:grid-cols-3 lg:gap-[32px]">
          {services.map((service, index) => (
            <ServiceCard service={service} key={index} />
          ))}
        </div>
      </Shell>
    </Shell>
  )
}
