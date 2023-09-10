import { redirect } from "next/navigation"
import { currentUser } from "@clerk/nextjs"

import { AdminFooter } from "@/components/layouts/admin-footer"
import { AdminHeader } from "@/components/layouts/admin-header"

export default async function AdminLayout({
  children,
}: React.PropsWithChildren) {
  const user = await currentUser()

  if (!user) {
    redirect("/logowanie")
  }
  return (
    <div className="flex min-h-screen flex-col">
      <AdminHeader user={user} />
      <main className="container h-full flex-1 overflow-hidden">
        {children}
      </main>
      <AdminFooter />
    </div>
  )
}
