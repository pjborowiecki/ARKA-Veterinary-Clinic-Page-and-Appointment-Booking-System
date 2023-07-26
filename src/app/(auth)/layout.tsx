interface AuthLayoutProps {
  children: React.ReactNode
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="container flex min-h-screen items-center justify-center overflow-hidden">
      <main className="container">{children}</main>
    </div>
  )
}
