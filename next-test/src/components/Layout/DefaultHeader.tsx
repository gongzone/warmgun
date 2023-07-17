import Link from "next/link"

import { navs } from "@/lib/constants/nav"
import { site } from "@/lib/constants/site"
import { buttonVariants } from "@/components/ui/Button"
import { NavLink } from "@/components/ui/NavLink"
import { LogoIcon } from "@/components/icons/LogoIcon"
import { SearchIcon } from "@/components/icons/SearchIcon"

export const DefaultHeader = () => {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="container h-16 flex items-center justify-between">
        <div className="flex items-center gap-10">
          <HeaderLogo />
          <HeaderNav />
        </div>

        <div className="flex items-center gap-4">
          <SearchLink />
          <LoginLink />
        </div>
      </div>
    </header>
  )
}

const HeaderLogo = () => {
  return (
    <Link href="/" className="flex items-center gap-2">
      <LogoIcon className="w-5 h-5" />
      <span className="hidden font-bold md:block">{site.title}</span>
    </Link>
  )
}

const HeaderNav = () => {
  return (
    <nav>
      <ul className="hidden md:flex md:items-center md:gap-6">
        {navs.mainNav.slice(1, navs.mainNav.length).map((nav) => (
          <li key={nav.title}>
            <NavLink href={nav.href}>{nav.title}</NavLink>
          </li>
        ))}
      </ul>
    </nav>
  )
}

const SearchLink = () => {
  return (
    <Link href="/search">
      <SearchIcon className="w-6 h-6" />
    </Link>
  )
}

const LoginLink = () => {
  return (
    <Link href="/auth/login" className={buttonVariants({ variant: "default" })}>
      로그인
    </Link>
  )
}
