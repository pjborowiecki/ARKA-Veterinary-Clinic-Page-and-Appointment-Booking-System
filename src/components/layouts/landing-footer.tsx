import { ThemeToggle } from "@/components/theme-toggle"

export function LandingFooter() {
  return (
    <footer className="flex w-full justify-end border-t bg-background">
      <ThemeToggle />
    </footer>
  )
}
