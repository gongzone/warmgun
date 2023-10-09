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
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Avatar src={article.user.avatar} size="sm" />
          <Text size="sm" weight={500}>
            {article.user.username}
          </Text>
          <span>·</span>
          <Text size="sm" color="light" weight={300}>
            {formatDate(article.createdAt)}
          </Text>
        </div>
        <AspectRatio ratio={16 / 12}>
          <Image
            src={article.thumbnail}
            alt="Photo by Drew Beamer"
            fill
            className="rounded-md object-cover shadow-md"
          />
        </AspectRatio>
      </CardHeader>

      <CardBody className="pb-2">
        <div className="flex flex-col gap-0.5 ">
          <Text as="h3" size="md" weight={600} clamp={1}>
            {article.title}
          </Text>
          <Text as="p" weight={300} clamp={3} breaking="all">
            {article.excerpt}
          </Text>
        </div>
      </CardBody>

      <CardFooter className="justify-between">
        <ul className="flex items-center gap-1.5">
          {article.tags.map((tag) => (
            <li key={tag}>
              <Badge variant="base-ghost">{tag}</Badge>
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
      </CardFooter>
    </Card>
  )
}
