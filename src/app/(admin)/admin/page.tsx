import { redirect } from "next/navigation"
import { auth } from "@/auth"

import { DEFAULT_UNAUTHENTICATED_REDIRECT } from "@/config/defaults"

export default async function AdminPage() {
  const session = await auth()
  session?.user
    ? redirect("/admin/dostepnosc")
    : redirect(DEFAULT_UNAUTHENTICATED_REDIRECT)

  return <div>Admin Page</div>
}
