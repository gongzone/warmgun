import { Button } from "@/components/@ui/Button"
import { Icons } from "@/components/@ui/Icons"

import { HeaderLogo } from "./_HeaderLogo"
import { HeaderNav } from "./_HeaderNav"

const DefaultHeader = () => {
  return (
    <header className="sticky top-0 z-30 w-full border-b bg-background ">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-4">
          <Button size="icon" className="md:hidden">
            <Icons.Hamburger className="h-5 w-5" />
          </Button>

          <div className="flex items-center gap-10">
            <HeaderLogo />
            <HeaderNav />
          </div>
        </div>
        <div></div>
      </div>
    </header>
  )
}

export { DefaultHeader }
