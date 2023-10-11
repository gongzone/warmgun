import Image from "next/image"

import { formatDate } from "@/lib/format"
import { AspectRatio } from "@/components/@ui/aspect-ratio"

import { Avatar } from "../@ui/avatar"
import { Badge } from "../@ui/badge"
import { Card, CardBody, CardFooter, CardHeader } from "../@ui/card"
import { Icons } from "../@ui/icons"
import { Text } from "../@ui/text"
import { TextWithIcon } from "../@ui/text-with-icon"

type ArticleItemProps = {
  article: {
    title: string
    excerpt: string
    thumbnail: string
    user: {
      username: string
      avatar: string
    }
    tags: string[]
    createdAt: Date
  }
}

export const ArticleItem = ({ article }: ArticleItemProps) => {
  return (
    <div>
      <header className="flex items-center gap-1.5 pb-1.5">
        <Avatar src={article.user.avatar} size="sm" border={true} />
        <Text size="sm" weight={500}>
          {article.user.username}
        </Text>
        <span>·</span>
        <Text size="sm" color="light" weight={300}>
          {formatDate(article.createdAt)}
        </Text>
      </header>
      <Card className="space-y-2.5 overflow-hidden rounded-t-none">
        <div className="space-y-6">
          <AspectRatio ratio={16 / 10}>
            <Image
              src={article.thumbnail}
              alt="Photo by Drew Beamer"
              fill
              className="object-cover"
            />
          </AspectRatio>

          <div className="flex flex-col gap-1 px-6">
            <Text
              as="h3"
              size="md"
              weight={500}
              clamp={2}
              className="text-foreground/90"
            >
              {article.title}
            </Text>
            <Text
              as="p"
              weight={300}
              clamp={3}
              breaking="all"
              className="text-sm text-foreground/75"
            >
              {article.excerpt}
            </Text>
          </div>
        </div>

        <footer className="flex items-center justify-between px-6 pb-6">
          <ul className="flex items-center gap-1.5">
            {article.tags.map((tag) => (
              <li key={tag}>
                <Badge variant="base-invert">{tag}</Badge>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <TextWithIcon
              icon={<Icons.Heart className="h-4 w-4 text-red-500" />}
              text={<Text size="sm">12</Text>}
              gap={0.5}
            />
            <TextWithIcon
              icon={<Icons.Comment className="h-4 w-4" />}
              text={<Text size="sm">112</Text>}
              gap={0.5}
            />
          </div>
        </footer>
      </Card>
    </div>
  )
}
