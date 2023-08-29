import { Button } from "@/components/@ui/button"
import { Container } from "@/components/@ui/container"

import { AuthModal } from "./auth-modal"
import { HeaderLogo } from "./header-logo"
import { MainNav } from "./main-nav"

const DefaultHeader = () => {
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
          <AuthModal triggerButton={<Button>로그인</Button>} />
        </section>
      </Container>
    </header>
  )
}

export { DefaultHeader }