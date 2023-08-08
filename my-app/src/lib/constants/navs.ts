import { Icons, type IconType } from "@/components/@ui/Icons"

interface Nav {
  title: string
  href: string
  icon?: IconType
}

const navs = {
  mainNav: [
    {
      title: "Home",
      href: "/",
      icon: Icons.Home,
    },
    {
      title: "아티클",
      href: "/article",
      icon: Icons.Article,
    },
    {
      title: "커뮤니티",
      href: "/community",
      icon: Icons.Community,
    },
  ] satisfies Nav[],
}

export { navs, type Nav }
