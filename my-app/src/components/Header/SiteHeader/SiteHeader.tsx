import { AuthNav } from "./AuthNav/AuthNav"
import { HamburgerSheet } from "./HamburgerSheet/HamburgerSheet"
import { MainNav } from "./MainNav/MainNav"

export function SiteHeader() {
  return (
    <header className="bg-background sticky top-0 z-40 w-full border-b">
      <div className="container flex h-16 items-center justify-between space-x-4">
        <div className="flex items-center gap-2">
          <HamburgerSheet />
          <MainNav />
        </div>

        <nav className="flex items-center space-x-1">
          {/* @ts-expect-error Async Server Component */}
          <AuthNav />
        </nav>
      </div>
    </header>
  )
}
