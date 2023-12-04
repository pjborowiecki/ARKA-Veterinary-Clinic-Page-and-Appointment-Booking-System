import { redirect } from "next/navigation"

import { getCurrentUser } from "@/lib/auth"

export default async function AdminPage() {
  const user = await getCurrentUser()
  user ? redirect("/admin/dostepnosc") : redirect("/logowanie")

  return <div>Admin Page</div>
}
