import { Footer } from "@/components/nav/landing/footer"
import { AboutSection } from "@/components/sections/about-section"
// import { ContactSection } from "@/components/sections/contact-section"
// import { GallerySection } from "@/components/sections/gallery-section"
// import { GroomerSection } from "@/components/sections/groomer-section"
import { HeroSection } from "@/components/sections/hero-section"
import { ServicesSection } from "@/components/sections/services-section"
import { TeamSection } from "@/components/sections/team-section"

export default function Home(): JSX.Element {
  return (
    <main className="mx-auto h-auto w-full max-w-[2560px] overflow-x-hidden">
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <TeamSection />
      {/* <GallerySection /> */}
      {/* <GroomerSection /> */}
      {/* <ContactSection /> */}
      <Footer />
    </main>
  )
}
