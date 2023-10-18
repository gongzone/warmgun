import Link from "next/link"

import { getServerSession } from "@/lib/auth"
import { fetchOneUser } from "@/lib/services/user/fetch"
import { buttonVariants } from "@/components/@ui/button"
import { Container } from "@/components/@ui/container"
import { TextWithIcon } from "@/components/@ui/text-with-icon"
import { UserMenu } from "@/components/app-shell/default-header/user-menu"

type BlogHeaderProps = {
  blogerUsername: string
}

export const BlogHeader = async ({ blogerUsername }: BlogHeaderProps) => {
  const session = await getServerSession()
  const bloger = await fetchOneUser(blogerUsername)

  return (
    <header className="sticky top-0 z-30 w-full border-b bg-background">
      <Container
        variant="wide"
        center
        className="flex h-16 items-center justify-between"
      >
        <div>
          <TextWithIcon
            icon={(Icons) => (
              <Link
                className={buttonVariants({
                  variant: "base",
                  onlyIcon: true,
                  size: "sm",
                })}
                href="/"
              >
                <Icons.Logo className="h-4 w-4" />
              </Link>
            )}
            text={(Text) => (
              <Link href={`/@${bloger?.username}`}>
                <Text size="lg" weight={500}>
                  {bloger?.profile?.blogName}
                </Text>
              </Link>
            )}
            gap={3.5}
          />
        </div>
        <div>
          {session?.user ? (
            <UserMenu
              name={session.user.username}
              image={session.user.profile?.avatar}
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
