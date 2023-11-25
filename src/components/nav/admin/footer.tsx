import { Shell } from "@/components/shells/shell"
import { ThemeToggle } from "@/components/theme-toggle"

export function Footer(): JSX.Element {
  return (
    <footer className="w-full border-t bg-background">
      <Shell as="footer" className="flex items-center justify-end">
        <ThemeToggle />
      </Shell>
    </footer>
  )
}
