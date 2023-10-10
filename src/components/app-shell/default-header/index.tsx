import Link from "next/link"

import { getServerSession } from "@/lib/auth"
import { buttonVariants } from "@/components/@ui/button"
import { Container } from "@/components/@ui/container"

import { HeaderLogo } from "./header-logo"
import { MainNav } from "./main-nav"
import { MobileNav } from "./mobile-nav"
import { UserMenu } from "./user-menu"

const DefaultHeader = async () => {
  const session = await getServerSession()

  return (
    <header className="sticky top-0 z-30 w-full border-b bg-[#f8f7f4] ">
      <Container
        variant="wide"
        center
        className="flex h-16 items-center justify-between"
      >
        <div className="flex items-center gap-10">
          <div className="flex items-center gap-4">
            <MobileNav />
            <HeaderLogo />
          </div>
          <MainNav />
        </div>
        <div>
          {session?.user ? (
            <UserMenu
              name={session.user.username}
              image={session.user.avatar}
            />
          ) : (
            <Link className={buttonVariants()} href="/login">
              로그인
            </Link>
          )}
        </div>
      </Container>
    </header>
  )
}

export { DefaultHeader }
