interface AuthLayoutProps {
  children: React.ReactNode
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="min-h-screen overflow-hidden">
      <main className="container items-center">{children}</main>
    </div>
  )
}
