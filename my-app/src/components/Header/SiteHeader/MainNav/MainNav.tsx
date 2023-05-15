import * as React from "react"
import Link from "next/link"

import { siteConfig } from "@/lib/site"
import { LogoIcon } from "@/components/@icons/LogoIcon"

export function MainNav() {
  return (
    <nav className="flex items-center gap-10">
      <Link href="/" className="flex items-center gap-2">
        <LogoIcon className="h-6 w-6" />
        <h2 className="hidden font-bold md:block">{siteConfig.name}</h2>
      </Link>

      <ul className="hidden md:flex md:gap-6">
        {siteConfig.mainNav.map((item, index) => (
          <li key={index}>
            <Link
              href={item.href}
              className="text-muted-foreground flex items-center text-sm font-semibold"
            >
              {item.title}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}
