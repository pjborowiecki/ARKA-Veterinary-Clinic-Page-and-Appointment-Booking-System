import { redirect } from "next/navigation"
import { currentUser } from "@clerk/nextjs"

// import { DashboardHeader } from "@/components/layouts/dashboard-header"
// import {DashboardFooter} from "@/components/layouts/dashboard-footer"

interface DashboardLayoutProps {
  children: React.ReactNode
}

export default async function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  const user = await currentUser()

  if (!user) {
    redirect("/login")
  }

  return (
    <div className="flex min-h-screen flex-col">
      {/* <DashboardHeader user={user} /> */}
      <div>
        <main className="flex w-full flex-col overflow-hidden">{children}</main>
      </div>
    </div>
  )
}
