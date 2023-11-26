import { getClinic } from "@/actions/clinic"

import { Footer } from "@/components/nav/landing/footer"
import { AboutSection } from "@/components/sections/about-section"
import { HeroSection } from "@/components/sections/hero-section"
import { ServicesSection } from "@/components/sections/services-section"
import { TeamSection } from "@/components/sections/team-section"

export default async function Home(): Promise<JSX.Element> {
  const clinic = await getClinic()

  return (
    <main className="mx-auto h-auto w-full max-w-[2560px] overflow-x-hidden">
      <HeroSection address={clinic?.address || ""} />
      <AboutSection />
      <ServicesSection />
      <TeamSection />
      <Footer
        address={clinic?.address || ""}
        phone_1={clinic?.phone_1 || ""}
        phone_2={clinic?.phone_2 || ""}
      />
    </main>
  )
}
