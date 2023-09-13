import Link from "next/link"
import type { User } from "@clerk/nextjs/dist/types/server"

import { adminConfig } from "@/config/admin"
import { siteConfig } from "@/config/site"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button, buttonVariants } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Icons } from "@/components/icons"
import { AdminMainNav } from "@/components/layouts/admin-main-nav"
import { AdminMobileNav } from "@/components/layouts/admin-mobile-nav"

interface AdminHeaderProps {
  user: User | null
}

export function AdminHeader({ user }: AdminHeaderProps) {
  const initials = `${user?.firstName?.charAt(0) ?? ""} ${
    user?.lastName?.charAt(0) ?? ""
  }`
  const email =
    user?.emailAddresses?.find((e) => e.id === user.primaryEmailAddressId)
      ?.emailAddress ?? ""

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background">
      <div className="container flex h-16 items-center justify-between">
        <Link
          aria-label="Home"
          href="/"
          className="flex items-center space-x-2"
        >
          <span className="flex font-bold">{siteConfig.nameShort}</span>
        </Link>

        <div className="flex items-center justify-center gap-x-8">
          <AdminMainNav items={adminConfig.sidebarNav} />

          <div className="flex items-center gap-x-4">
            <AdminMobileNav items={siteConfig.mobileNav} />
            <nav className="flex items-center space-x-2">
              {user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="secondary"
                      className="relative h-8 w-8 rounded-full"
                    >
                      <Avatar className="h-8 w-8">
                        <AvatarImage
                          src={user.imageUrl}
                          alt={user.username ?? ""}
                        />
                        <AvatarFallback>{initials}</AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end" forceMount>
                    <DropdownMenuLabel className="font-normal">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">
                          {user.firstName} {user.lastName}
                        </p>
                        <p className="text-xs leading-none text-muted-foreground">
                          {email}
                        </p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                      <DropdownMenuItem asChild>
                        <Link href="/admin/przychodnia">
                          <Icons.user
                            className="mr-2 h-4 w-4"
                            aria-hidden="true"
                          />
                          Przychodnia
                          <DropdownMenuShortcut>⇧⌘H</DropdownMenuShortcut>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href="/admin/przychodnia/rezerwacje">
                          <Icons.terminal
                            className="mr-2 h-4 w-4"
                            aria-hidden="true"
                          />
                          Rezerwacje
                          <DropdownMenuShortcut>⇧⌘R</DropdownMenuShortcut>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href="/admin/przychodnia/godziny">
                          <Icons.user
                            className="mr-2 h-4 w-4"
                            aria-hidden="true"
                          />
                          Godziny przyjęć
                          <DropdownMenuShortcut>⇧⌘G</DropdownMenuShortcut>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href="/admin/przychodnia/dni-wolne">
                          <Icons.user
                            className="mr-2 h-4 w-4"
                            aria-hidden="true"
                          />
                          Dni wolne
                          <DropdownMenuShortcut>⇧⌘D</DropdownMenuShortcut>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href="/admin/profil">
                          <Icons.user
                            className="mr-2 h-4 w-4"
                            aria-hidden="true"
                          />
                          Profil
                          <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                        </Link>
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href="/wyloguj">
                        <Icons.logout
                          className="mr-2 h-4 w-4"
                          aria-hidden="true"
                        />
                        Wyloguj
                        <DropdownMenuShortcut>⇧⌘W</DropdownMenuShortcut>
                      </Link>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Link href="/logowanie">
                  <div
                    className={buttonVariants({
                      size: "sm",
                    })}
                  >
                    Zaloguj
                    <span className="sr-only">Zaloguj</span>
                  </div>
                </Link>
              )}
            </nav>
          </div>
        </div>
      </div>
    </header>
  )
}
