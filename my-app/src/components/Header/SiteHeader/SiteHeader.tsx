import Link from "next/link"

import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { Button, buttonVariants } from "@/components/ui/button"
import { Icons } from "@/components/ui/icons"

import { AvatarPopover } from "./AvatarPopover/AvatarPopover"
import { MainNav } from "./MainNav/MainNav"

export async function SiteHeader() {
  const user = null

  return (
    <header className="bg-background sticky top-0 z-40 w-full border-b">
      <div className="container flex h-16 items-center justify-between space-x-4">
        <MainNav items={siteConfig.mainNav} />

        <nav className="flex items-center space-x-1">
          {user ? (
            <AvatarPopover
              username={data.username}
              email={data.email}
              nickname={data.profile.nickname}
              avatar={data.profile.avatar}
            />
          ) : (
            <Link
              href="/auth/login"
              className={cn(
                buttonVariants({ variant: "default" }),
                "bg-foreground hover:bg-foreground/90"
              )}
            >
              로그인
            </Link>
          )}
        </nav>
      </div>
    </header>
  )
}
