import Link from "next/link"
import { redirect } from "next/navigation"

import { adminConfig } from "@/config/admin"
import { DEFAULT_UNAUTHENTICATED_REDIRECT } from "@/config/defaults"
import { siteConfig } from "@/config/site"

import auth from "@/lib/auth"
import { cn } from "@/lib/utils"

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
  const session = await auth()
  if (!session) redirect(DEFAULT_UNAUTHENTICATED_REDIRECT)

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
              {session?.user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger
                    asChild
                    className={cn(
                      buttonVariants({ variant: "user", size: "icon" }),
                      "transition-all duration-300 ease-in-out hover:opacity-70"
                    )}
                  >
                    <Button variant="user" size="icon">
                      <Avatar className="size-full">
                        {session.user.image && (
                          <AvatarImage
                            src={session.user.image}
                            alt={session.user.name ?? "user's profile picture"}
                          />
                        )}
                        <AvatarFallback className="size-9 cursor-pointer p-1.5 text-xs capitalize">
                          <Icons.user className="size-4 rounded-full" />
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end" forceMount>
                    <DropdownMenuLabel className="font-normal">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">
                          {session.user.name}
                        </p>
                        <p className="text-xs leading-none text-muted-foreground">
                          {session.user.email}
                        </p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                      <DropdownMenuItem asChild>
                        <Link href="/admin/przychodnia">
                          <Icons.clinic
                            className="mr-2 size-4"
                            aria-hidden="true"
                          />
                          Przychodnia
                          <DropdownMenuShortcut>⇧⌘H</DropdownMenuShortcut>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href="/admin/rezerwacje">
                          <Icons.calendar
                            className="mr-2 size-4"
                            aria-hidden="true"
                          />
                          Rezerwacje
                          <DropdownMenuShortcut>⇧⌘R</DropdownMenuShortcut>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href="/admin/dostepnosc">
                          <Icons.businessHours
                            className="mr-2 size-4"
                            aria-hidden="true"
                          />
                          Dostępność
                          <DropdownMenuShortcut>⇧⌘D</DropdownMenuShortcut>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href="/admin/profil">
                          <Icons.user
                            className="mr-2 size-4"
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
