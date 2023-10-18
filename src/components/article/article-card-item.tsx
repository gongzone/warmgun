import Image from "next/image"
import Link from "next/link"

import imageFallback from "@/lib/assets/image-fallback.png"
import { formatDate } from "@/lib/format"
import { type ArticleDisplay } from "@/lib/services/article/fetch"
import { AspectRatio } from "@/components/@ui/aspect-ratio"

import { Avatar } from "../@ui/avatar"
import { Badge } from "../@ui/badge"
import { Card } from "../@ui/card"
import { Text } from "../@ui/text"
import { TextWithIcon } from "../@ui/text-with-icon"

type ArticleItemProps = {
  article: ArticleDisplay
}

export const ArticleCardItem = ({ article }: ArticleItemProps) => {
  return (
    <div className="h-full w-full">
      <header className="flex items-center gap-1.5 pb-1.5">
        <Avatar src={article.user?.profile?.avatar} size="sm" />
        <Text size="sm" weight={500}>
          {article.user.username}
        </Text>
        <span>·</span>
        <Text size="sm" color="light" weight={300}>
          {formatDate(article.createdAt, "fromNow")}
        </Text>
      </header>
      <Card className="overflow-hidden rounded-t-none">
        <Link href={`/@${article.user.username}/${article.slug}`}>
          <AspectRatio
            ratio={16 / 9}
            className="flex items-center justify-center bg-muted"
          >
            <Image
              src={article.thumbnail ?? imageFallback}
              alt={article.title}
              fill={article.thumbnail ? true : false}
              sizes={article.thumbnail ? "100%" : "50%"}
              className={article.thumbnail ? "object-cover" : "w-1/3"}
            />
          </AspectRatio>
        </Link>

        <div className="flex flex-col gap-0.5 px-5 py-4">
          <Link href={`/@${article.user.username}/${article.slug}`}>
            <Text as="h3" size="md" weight={500} clamp={1}>
              {article.title}
            </Text>
          </Link>
          <Link href={`/@${article.user.username}/${article.slug}`}>
            <Text as="p" size="sm" weight={400} clamp={3} breaking="all">
              {article.excerpt}
            </Text>
          </Link>
        </div>

        <footer className="flex items-center justify-between px-5 pb-4">
          <div>
            {article.tags.length > 0 ? (
              <Badge>{article.tags[0].name}</Badge>
            ) : null}
          </div>

          <div className="flex items-center gap-2">
            <TextWithIcon
              icon={(Icons) => <Icons.Heart className="h-4 w-4 text-red-500" />}
              text={(Text) => <Text size="sm">{article._count.likedBy}</Text>}
              gap={0.5}
            />
            <TextWithIcon
              icon={(Icons) => <Icons.Comment className="h-4 w-4" />}
              text={(Text) => <Text size="sm">{article._count.comments}</Text>}
              gap={0.5}
            />
          </div>
        </footer>
      </Card>
    </div>
  )
}
