import Image from "next/image"
import Link from "next/link"

import { dateClient } from "@/lib/date"
import { formatDate } from "@/lib/format"
import { type ArticleDetail } from "@/lib/services/article/fetch"
import { Avatar } from "@/components/@ui/avatar"
import { Badge } from "@/components/@ui/badge"
import { Button } from "@/components/@ui/button"
import { Icons } from "@/components/@ui/icons"
import { Text } from "@/components/@ui/text"
import { TextWithIcon } from "@/components/@ui/text-with-icon"

type ArticleInfoProps = {
  article: ArticleDetail
}

export const ArticleInfo = ({ article }: ArticleInfoProps) => {
  return (
    <div>
      <div className="flex items-center gap-4">
        <Link
          href={`/@${article.user.username}`}
          className="flex items-center gap-2"
        >
          <Avatar src={article.user.profile?.avatar} size="lg" />
          <div className="flex flex-col">
            <Text weight={600}>{article.user.profile?.displayName}</Text>
            <Text size="sm">{article.user.profile?.who}</Text>
          </div>
        </Link>
        <span className="opacity-70">|</span>
        <TextWithIcon
          icon={(Icons) => <Icons.Clock className="h-4 w-4" />}
          text={(Text) => <Text size="sm">{article.readingTime} Min</Text>}
        />
        <span className="opacity-70">|</span>
        <TextWithIcon
          icon={(Icons) => <Icons.Calendar className="h-4 w-4" />}
          text={(Text) => (
            <Text size="sm">
              {dateClient(article.updatedAt).diff(article.createdAt, "day") >= 1
                ? `${formatDate(article.updatedAt, "default")} (수정됨)`
                : formatDate(article.createdAt, "default")}
            </Text>
          )}
        />
      </div>

      <div className="mt-4">
        <Text as="h2" size="4xl" weight={700}>
          {article.title}
        </Text>
      </div>

      {article.tags.length > 0 ? (
        <ul className="mt-2">
          {article.tags.map((tag) => (
            <li key={tag.id}>
              <Badge>{tag.name}</Badge>
            </li>
          ))}
        </ul>
      ) : null}

      <div className="mt-4 flex items-center justify-between border-y py-2">
        <div className="flex items-center gap-2">
          <Button radius="full" size="xs">
            <Icons.Heart className="h-4 w-4" />
            {article._count.likedBy}
          </Button>
          <Button radius="full" size="xs">
            <Icons.Comment className="h-4 w-4" />
            {article._count.comments}
          </Button>
        </div>

        <div></div>
      </div>

      <div className="mt-8">
        <Image
          src={article.thumbnail}
          alt={article.title}
          width={1200}
          height={800}
        />
      </div>
    </div>
  )
}
