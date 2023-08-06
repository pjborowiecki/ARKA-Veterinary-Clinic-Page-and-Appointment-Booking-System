import { LandingFooter } from "@/components/layouts/landing-footer"

interface LandingLayoutProps {
  children: React.ReactNode
}

export default function LandingLayout({ children }: LandingLayoutProps) {
  return (
    <div className="">
      <main>{children}</main>
      <LandingFooter />
    </div>
  )
}
