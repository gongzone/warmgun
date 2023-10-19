import Image from "next/image"

import { formatDate } from "@/lib/format"
import { type ArticleDisplay } from "@/lib/services/article/types"
import { Text } from "@/components/@ui/text"

import { Avatar } from "../@ui/avatar"
import { Badge } from "../@ui/badge"
import { TextWithIcon } from "../@ui/text-with-icon"

type ArticleListItemProps = {
  article: ArticleDisplay
}

export const ArticleListItem = ({ article }: ArticleListItemProps) => {
  return (
    <div className="border-b py-6">
      <div className="flex items-center justify-between gap-9 ">
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <div className="mb-2 flex items-center gap-2">
              <Avatar size="sm" src={article.user.profile?.avatar} />
              <Text weight={500}>{article.user.profile?.displayName}</Text>
              <span>·</span>
              <Text size="sm" weight={300}>
                {formatDate(article.createdAt, "fromNow")}
              </Text>
              <span>·</span>
              <div className="flex items-center gap-2">
                <TextWithIcon
                  icon={(Icons) => (
                    <Icons.Heart className="h-4 w-4 text-red-500" />
                  )}
                  text={(Text) => (
                    <Text size="sm">{article._count.likedBy}</Text>
                  )}
                  gap={0.5}
                />
                <TextWithIcon
                  icon={(Icons) => <Icons.Comment className="h-4 w-4" />}
                  text={(Text) => (
                    <Text size="sm">{article._count.comments}</Text>
                  )}
                  gap={0.5}
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-0.5">
            <Text clamp={2} size="xl" as="h3" weight={600}>
              {article.title}
            </Text>
            <Text clamp={3} as="p">
              {article.excerpt}
            </Text>
          </div>
        </div>

        <Image
          src={article.thumbnail}
          alt="image"
          width={300}
          height={300}
          className="h-[125px] w-[125px]"
        />
      </div>

      <div className="mt-4 flex items-center  gap-2">
        <ul>
          {article.tags.map((tag) => (
            <li key={tag.id}>
              <Badge>{tag.name}</Badge>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
