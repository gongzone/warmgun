import Image from "next/image"
import Link from "next/link"
import { type Article } from "@/db/schema/article"
import { type User } from "@/db/schema/user"

import imageFallback from "@/lib/assets/image-fallback.png"
import { Avatar } from "@/components/@ui/avatar"
import { Text } from "@/components/@ui/text"

type ShowcaseItemProps = {
  article: Article & { author: User | null }
}

export const ShowcaseItem = ({ article }: ShowcaseItemProps) => {
  return (
    <div className="relative overflow-hidden rounded-lg shadow-lg">
      <Image
        className="h-[215px] w-full"
        src={article.thumbnail ?? imageFallback}
        alt={article.title}
        width={600}
        height={400}
      />
      <div className="absolute bottom-0 w-full border-t border-t-black/50 bg-black/40 p-3 text-white/90 backdrop-blur backdrop-saturate-150">
        <Link
          href={`/@${article.author?.username}`}
          className="inline-flex items-center gap-1.5"
        >
          <Avatar
            src={article.author?.avatar}
            alt={article.author?.username}
            size="xs"
          />
          <Text size="sm">{article.author?.username}</Text>
        </Link>
        <div>
          <Link
            href={`/@${article.author?.username}/${article.slug}`}
            className="inline-flex"
          >
            <Text weight={500} clamp={1}>
              {article.title}
            </Text>
          </Link>
          <Link
            href={`/@${article.author?.username}/${article.slug}`}
            className="inline-flex"
          >
            <Text size="sm" weight={300} clamp={2}>
              {article.excerpt}
            </Text>
          </Link>
        </div>
      </div>
    </div>
  )
}
