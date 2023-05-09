export type SiteConfig = typeof siteConfig

export const siteConfig = {
  name: "Warmgun",
  description:
    "Beautifully designed components built with Radix UI and Tailwind CSS.",
  mainNav: [
    {
      title: "아티클",
      href: "/",
    },
    {
      title: "태그",
      href: "/",
    },
    {
      title: "장르",
      href: "/",
    },
  ],
  genre: [
    {
      title: "프론트엔드",
      href: "/genre/frontend",
    },
    {
      title: "백엔드",
      href: "/genre/backend",
    },
    {
      title: "데브옵스",
      href: "/genre/devops",
    },
    {
      title: "모바일",
      href: "/genre/mobile",
    },
    {
      title: "AI / 데이터 사이언스",
      href: "/genre/data-science",
    },
    {
      title: "게임",
      href: "/genre/game",
    },
    {
      title: "기타",
      href: "/genre/etc",
    },
  ],
  links: {
    twitter: "https://twitter.com/shadcn",
    github: "https://github.com/shadcn/ui",
    docs: "https://ui.shadcn.com",
  },
}
