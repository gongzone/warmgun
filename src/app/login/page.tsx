import Link from "next/link"

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
import { OauthLoginButton } from "@/components/auth/oauth-login-button"

const socials = [
  {
    provider: "google",
    name: "구글",
    icon: <Icons.Google className="h-5 w-5" />,
  },
  {
    provider: "github",
    name: "깃허브",
    icon: <Icons.Github className="h-5 w-5" />,
  },
  {
    provider: "naver",
    name: "네이버",
    icon: <Icons.Naver className="h-5 w-5" />,
  },
  {
    provider: "kakao",
    name: "카카오",
    icon: <Icons.Kakao className="h-5 w-5" />,
  },
]

export default function LoginPage() {
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
              <li key={social.name}>
                <OauthLoginButton
                  provider={social.provider}
                  name={social.name}
                  icon={social.icon}
                />
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
