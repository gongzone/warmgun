import Link from "next/link"

import { siteConfig } from "@/config/site"
import { buttonVariants } from "@/components/ui/button"
import { Icons } from "@/components/ui/icons"

import { AvatarPopover } from "./AvatarPopover/AvatarPopover"
import { MainNav } from "./MainNav/MainNav"

export function SiteHeader() {
  return (
    <header className="bg-background sticky top-0 z-40 w-full border-b">
      <div className="container flex h-16 items-center justify-between space-x-4">
        <MainNav items={siteConfig.mainNav} />

        <nav className="flex items-center space-x-1">
          <AvatarPopover
            username="gongzone"
            nickname="공존의 문화공간"
            email="dnjsqhwo@gmail.com"
            avatar="https://picsum.photos/id/452/128/128"
          />
        </nav>
      </div>
    </header>
  )
}
