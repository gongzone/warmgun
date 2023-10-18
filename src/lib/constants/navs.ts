import { Icons, type IconType } from "@/components/@ui/icons"

interface Nav {
  name: string
  href: string
  icon?: IconType
  enum?: string
}

const navs = {
  main: [
    { name: "아티클", href: "/articles", icon: Icons.DocumentList },
  ] satisfies Nav[],
}

export { type Nav, navs }
