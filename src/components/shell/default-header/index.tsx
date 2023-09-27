import Link from "next/link"
import { getServerSession } from "next-auth"

import { authOptions } from "@/lib/auth"
import { buttonVariants } from "@/components/@ui/button"
import { Container } from "@/components/@ui/container"

import { HeaderLogo } from "./header-logo"
import { MainNav } from "./main-nav"
import { UserMenu } from "./user-menu"

const DefaultHeader = async () => {
  const session = await getServerSession(authOptions)
  console.log("헤더 세션", session)
  return (
    <header className="sticky top-0 z-30 w-full border-b bg-background">
      <Container
        variant="wide"
        center={true}
        className="flex h-16 items-center justify-between"
      >
        <section className="flex items-center gap-10">
          <div className="space-x-2">
            {/* TODO: HambergurSheet */}
            <HeaderLogo />
          </div>
          <MainNav />
        </section>
        <section>
          {session?.user ? (
            <UserMenu name={session.user.name!} image={session.user.image!} />
          ) : (
            <Link className={buttonVariants()} href="/login">
              로그인
            </Link>
          )}
        </section>
      </Container>
    </header>
  )
}

export { DefaultHeader }
