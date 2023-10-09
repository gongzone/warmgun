import Image from "next/image"

import { AspectRatio } from "@/components/@ui/aspect-ratio"

import { Text } from "../@ui/text"

type BigArticleItemProps = {
  title: string
  excerpt: string
  thumbnail: string
}

export const BigArticleItem = ({
  title,
  excerpt,
  thumbnail,
}: BigArticleItemProps) => {
  return (
    <div className="flex gap-7">
      <AspectRatio ratio={16 / 9}>
        <Image
          src={thumbnail}
          alt="Photo by Drew Beamer"
          fill
          className="rounded-md object-cover"
        />
      </AspectRatio>

      <div className="flex max-w-[275px] flex-col gap-2">
        <Text size="xl" weight={600}>
          {title}
        </Text>
        <Text weight={300} clamp={6}>
          {excerpt}
        </Text>
      </div>
    </div>
  )
}
