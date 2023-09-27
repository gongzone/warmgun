import Link from "next/link"
import { redirect } from "next/navigation"

import { getServerSession } from "@/lib/auth"
import { buttonVariants } from "@/components/@ui/button"
import {
  Card,
  CardBody,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/@ui/card"
import { Divider } from "@/components/@ui/divider"
import { Icons } from "@/components/@ui/icons"
import { Text } from "@/components/@ui/text"

import { OauthButton } from "./_components/oauth-button"
import { socials } from "./_lib/constants"

export default async function LoginPage() {
  const session = await getServerSession()

  if (session) {
    redirect("/")
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center px-4">
      <Card className="left-1/2 top-1/2 w-[435px] p-2">
        <CardHeader>
          <CardTitle>Warmgun</CardTitle>
          <CardDescription>
            Bring, Discover, Share Ideas & Stories
          </CardDescription>
        </CardHeader>
        <CardBody className="pb-0">
          <Text size="sm">소셜 로그인 or 회원가입</Text>
          <ul className="mt-2 grid grid-cols-2 gap-4">
            {socials.map((social) => (
              <li key={social.provider}>
                <OauthButton social={social} />
              </li>
            ))}
          </ul>
        </CardBody>
        <div className="my-6 px-6">
          <Divider />
        </div>
        <CardFooter className="justify-center">
          <Link
            className={buttonVariants({
              variant: "base",
              size: "md",
              radius: "full",
            })}
            href="/"
          >
            <Icons.ArrowUturnLeft className="h-5 w-5" /> 돌아가기
          </Link>
        </CardFooter>
      </Card>
    </main>
  )
}
