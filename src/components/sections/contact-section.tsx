import { ContactForm } from "@/components/forms/contact-form"
import { GoogleMapWidget } from "@/components/google-map-widget"

export function ContactSection() {
  return (
    <section
      id="contact"
      className="w-full max-w-[2560px] bg-primaryGreen bg-[url('/images/svg/radial-background.svg')] bg-cover bg-center bg-no-repeat"
    >
      <div
        // as="div"
        // variant="landingConstrained"
        className="mx-auto flex w-full max-w-[1440px] flex-col gap-[10vw] px-5 py-[48px] md:gap-[32px] md:px-6 md:py-[24px] lg:px-7"
      >
        <div className="mb-[48px] flex items-center justify-center md:grid md:grid-cols-2 md:gap-[32px] lg:gap-[48px] w-1400:mb-8">
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
          <div className="flex h-[50vw] items-center justify-center px-[4%] sm:px-[8%] md:mt-6 md:h-[364px] md:px-0 w-1400:h-[450px]">
            <GoogleMapWidget />
          </div>
          <div className="flex w-full justify-center px-[8%] md:px-0">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  )
}
