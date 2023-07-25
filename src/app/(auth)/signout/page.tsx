import { LogOutButtons } from "@/components/auth/logout-buttons"
import { Header } from "@/components/header"
import { Shell } from "@/components/shells/shell"

// export const runtime = "edge"

export default function SignOutPage() {
  return (
    <Shell className="max-w-xs">
      <Header
        title="Wylogowywanie"
        description="Czy na pewno chcesz się wylogować?"
        size="sm"
        className="text-center"
      />
      <LogOutButtons />
    </Shell>
  )
}
