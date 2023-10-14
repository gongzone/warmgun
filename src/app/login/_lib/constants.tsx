import { Icons, type IconType } from "@/components/@ui/icons"

export type Social = {
  provider: "google" | "github" | "naver" | "kakao"
  name: string
  Icon: IconType
}

export const socials = [
  {
    provider: "google",
    name: "구글",
    Icon: Icons.Google,
  },
  {
    provider: "github",
    name: "깃허브",
    Icon: Icons.Github,
  },
] satisfies Social[]
