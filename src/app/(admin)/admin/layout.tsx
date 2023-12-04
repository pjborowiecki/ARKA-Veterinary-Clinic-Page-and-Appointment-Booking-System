import { Header } from "@/components/nav/admin/header"

export default function AdminLayout({
  children,
}: React.PropsWithChildren): JSX.Element {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="container h-full flex-1 overflow-hidden">
        {children}
      </main>
    </div>
  )
}
