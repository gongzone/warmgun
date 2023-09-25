import Image from "next/image"

import { Article } from "@/lib/types/article"
import { Avatar } from "@/components/@ui/avatar"
import { Badge } from "@/components/@ui/badge"
import { Button } from "@/components/@ui/button"
import { Icons } from "@/components/@ui/icons"
import { Text } from "@/components/@ui/text"

import { useShowcase } from "./showcase-context"

interface ShowcaseArticle {
  article: Article
  index: number
}

const ShowcaseArticle = ({ article, index }: ShowcaseArticle) => {
  const [currentIndex] = useShowcase()

  return (
    <div>
      <div className="absolute top-1/2 z-20 w-[270px] -translate-y-1/2 space-y-4 px-5 transition-all">
        <div
          className={`h-full transition-opacity duration-1000 ease-in-out ${
            index === currentIndex ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="rounded-lg bg-foreground/90 p-4">
            <div className="mb-3 flex items-center gap-3">
              <Avatar
                src={article.user.avatar}
                alt={article.user.nickname}
                size="sm"
                border
              />
              <Text as="span" size="sm" color="invert" weight={300}>
                {article.user.nickname}
              </Text>
            </div>
            <Text as="h3" size="md" color="invert" weight={500}>
              {article.title}
            </Text>
            <div className="mt-2">
              <ul className="flex flex-wrap items-center gap-1">
                <li>
                  <Badge variant="primary">{article.category}</Badge>
                </li>
                <li>
                  <Badge>{article.tags[0]}</Badge>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-3 flex justify-center">
            <Button variant="base-ghost" radius="full" className="text-sm">
              View <Icons.CursorArrow className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      <Image
        src={article.thumbnail ?? ""}
        alt={article.title}
        loading="lazy"
        fill
        className={`object-cover transition-opacity duration-1000 ease-in-out ${
          index === currentIndex ? "opacity-100" : "opacity-50"
        }`}
      />
    </div>
  )
}

export { ShowcaseArticle }
