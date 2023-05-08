import Link from "next/link"

import { siteConfig } from "@/config/site"
import { buttonVariants } from "@/components/ui/button"
import { HomeHero } from "@/components/Hero/HomeHero/HomeHero"

export default function IndexPage() {
  return (
    <section className="container py-16 md:py-20">
      <HomeHero />
    </section>
  )
}
