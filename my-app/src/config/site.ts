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
  ],
  links: {
    twitter: "https://twitter.com/shadcn",
    github: "https://github.com/shadcn/ui",
    docs: "https://ui.shadcn.com",
  },
}
