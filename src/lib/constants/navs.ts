import { Icons, type IconType } from "@/components/@ui/icons"

interface Nav {
  name: string
  href: string
  icon?: IconType
  enum?: string
}

const navs = {
  main: [
    { name: "아티클", href: "/article", icon: Icons.DocumentList },
    { name: "커뮤니티", href: "/community", icon: Icons.Users },
  ] satisfies Nav[],
}

export { type Nav, navs }
