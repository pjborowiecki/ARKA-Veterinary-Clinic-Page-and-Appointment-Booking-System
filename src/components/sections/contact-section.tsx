import { ContactForm } from "@/components/forms/contact-form"
import { GoogleMapWidget } from "@/components/google-map-widget"
import { Shell } from "@/components/shells/shell"

export function ContactSection() {
  return (
    <Shell
      as="section"
      variant="landingFullWidth"
      id="contact"
      className="bg-primaryGreen bg-[url('/images/svg/radial-background.svg')] bg-cover bg-center bg-no-repeat"
    >
      <Shell as="div" variant="landingConstrained" className="my-[100px]">
        <div className="flex items-center justify-center md:mb-[48px] md:grid md:grid-cols-2 md:gap-[32px] lg:gap-[48px] w-1400:mb-[32px]">
          <h2 className="bg-gradient-to-br from-whiteGradientFrom  to-whiteGradientTo bg-clip-text text-center font-[BalooTamma] font-bold leading-[1.05] text-transparent md:col-start-2 md:col-end-3">
            <span className="whitespace-nowrap text-[11vw] md:text-[5.8vw] w-1400:text-[80px]">
              Pomoc i opieka
            </span>
            <br />
            <span className="text-[8.1vw] md:whitespace-nowrap md:text-[4.3vw] w-1400:text-[59px]">
              na wyciągnięcie ręki
            </span>
          </h2>
        </div>

        <div className="flex flex-col justify-center gap-[12vw] md:grid md:grid-cols-2 md:gap-[32px] lg:gap-[48px]">
          <div className="flex items-center justify-center">
            <GoogleMapWidget />
          </div>
          <div className="flex w-full justify-center px-[8%] md:px-0">
            <ContactForm />
          </div>
        </div>
      </Shell>
    </Shell>
  )
}
