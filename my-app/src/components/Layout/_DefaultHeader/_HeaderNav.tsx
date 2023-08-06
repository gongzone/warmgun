"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { navs } from "@/lib/constants/navs"
import { cn } from "@/lib/utils"

const HeaderNav = () => {
  const pathname = usePathname()

  return (
    <nav className="hidden md:block">
      <ul className="hidden md:flex md:items-center md:gap-6">
        {navs.mainNav.slice(1).map((nav) => (
          <li key={nav.title}>
            <Link
              href={nav.href}
              className={cn(
                "text-sm font-semibold text-foreground-light transition-colors hover:text-foreground",
                nav.href === pathname ? "text-foreground" : ""
              )}
            >
              {nav.title}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export { HeaderNav }
