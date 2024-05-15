import { Header } from "@/components/nav/admin/header"

interface AdminLayoutProps {
  children: React.ReactNode
}

export default function AdminLayout({
  children,
}: Readonly<AdminLayoutProps>): JSX.Element {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="container h-full flex-1 overflow-hidden">
        {children}
      </main>
    </div>
  )
}
