import Image from "next/image"

import heroImage from "@/lib/assets/hero-image.png"
import { Text } from "@/components/@ui/text"

export const SiteWords = () => {
  return (
    <div className="mx-auto lg:mx-0">
      <MainWords />
      <div className="relative flex">
        <SubWords />
        <Image
          className="-top-4 right-32 h-[125px] w-[125px] sm:h-[200px] sm:w-[200px] lg:absolute"
          src={heroImage}
          alt="hero-image"
          width={200}
          height={200}
          priority
        />
      </div>
    </div>
  )
}

const MainWords = () => {
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

const SubWords = () => {
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
