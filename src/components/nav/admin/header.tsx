import Link from "next/link"
import { redirect } from "next/navigation"

import { adminConfig } from "@/config/admin"
import { siteConfig } from "@/config/site"
import { getCurrentUser } from "@/lib/auth"
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
import { SignOutButton } from "@/components/auth/signout-button"
import { Icons } from "@/components/icons"
import { Navigation } from "@/components/nav/admin/navigation"
import { NavigationMobile } from "@/components/nav/admin/navigation-mobile"

export async function Header(): Promise<JSX.Element> {
  const user = await getCurrentUser()
  if (!user) redirect("/logowanie")

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
          <Navigation items={adminConfig.sidebarNav} />

          <div className="flex items-center gap-x-4">
            <NavigationMobile items={siteConfig.mobileNav} />
            <nav className="flex items-center space-x-2">
              {user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger
                    asChild
                    className="transition-all duration-300 ease-in-out hover:opacity-70"
                  >
                    <Button variant="user" size="icon">
                      <Avatar className="h-full w-full">
                        {user.image && (
                          <AvatarImage
                            src={user.image}
                            alt={user.name ?? "user's profile picture"}
                          />
                        )}
                        <AvatarFallback className="text-xs capitalize">
                          {user.email && user.email.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end" forceMount>
                    <DropdownMenuLabel className="font-normal">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">
                          {user.name}
                        </p>
                        <p className="text-xs leading-none text-muted-foreground">
                          {user.email}
                        </p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                      <DropdownMenuItem asChild>
                        <Link href="/admin/przychodnia">
                          <Icons.clinic
                            className="mr-2 h-4 w-4"
                            aria-hidden="true"
                          />
                          Przychodnia
                          <DropdownMenuShortcut>⇧⌘H</DropdownMenuShortcut>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href="/admin/rezerwacje">
                          <Icons.calendar
                            className="mr-2 h-4 w-4"
                            aria-hidden="true"
                          />
                          Rezerwacje
                          <DropdownMenuShortcut>⇧⌘R</DropdownMenuShortcut>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href="/admin/dostepnosc">
                          <Icons.businessHours
                            className="mr-2 h-4 w-4"
                            aria-hidden="true"
                          />
                          Dostępność
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
                      <SignOutButton />
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
