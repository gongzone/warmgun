import Image from "next/image"

import heroImage from "@/lib/assets/hero-image.png"
import { Text } from "@/components/@ui/text"

import { ArticleShowcase } from "./article-showcase"

export const HomeHero = () => {
  return (
    <div className="grid grid-cols-1 items-center gap-8 md:gap-10 lg:grid-cols-2">
      <div className="relative z-20 mx-auto space-y-4 md:space-y-6 lg:mx-0">
        <HeroMainWords />
        <div className="relative">
          <HeroSubWords />
          <Image
            className="absolute right-32 top-0"
            src={heroImage}
            alt="hero-image"
            width={200}
            height={200}
            priority
          />
        </div>
      </div>
      <div>
        <ArticleShowcase />
      </div>
    </div>
  )
}

const HeroMainWords = () => {
  return (
    <div>
      <Text
        as="h2"
        family="heading"
        size={{
          initial: "4xl",
          sm: "6xl",
        }}
      >
        당신의 삶의 이야기
      </Text>
      <Text
        as="h2"
        family="heading"
        size={{
          initial: "2xl",
          sm: "4xl",
        }}
      >
        기록하고 공유하세요
      </Text>
    </div>
  )
}

const HeroSubWords = () => {
  return (
    <div>
      <Text as="p" size="lg" weight={300}>
        Bring, Discover, Share
      </Text>
      <Text as="p" size="lg" weight={300}>
        Ideas & Stories
      </Text>
    </div>
  )
}
