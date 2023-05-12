import Image from "next/image"
import Link from "next/link"

import { formatDate } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { Icons } from "@/components/ui/icons"
import { UserAvatar } from "@/components/ui-blocks/UserAvatar"

interface ArticleItemProps {
  title: string
  subTitle: string
  slug: string
  coverImage: string | null
  likeCount: number
  commentCount: number
  createdAt: Date
  tags: string[]
  user: {
    username: string
    avatar: string | null
    field: string
  } | null
}

export function ArticleItem({
  title,
  subTitle,
  slug,
  coverImage,
  likeCount,
  commentCount,
  createdAt,
  tags,
  user,
}: ArticleItemProps) {
  return (
    <div className="flex flex-col gap-4">
      {user && (
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <UserAvatar src={user.avatar} avatarClassName="w-12 h-12" />
            <div className="flex flex-col">
              <span>{user.username}</span>
              <span className="text-muted-foreground font-extralight">
                {user.field}
              </span>
            </div>
          </div>
        </div>
      )}

      <Link href={slug}>
        <Image
          src={coverImage ? coverImage : ""}
          alt="cover"
          width={560}
          height={420}
          className="rounded-2xl shadow-xl"
        />
      </Link>
      <div className="flex flex-col gap-1">
        <Link href={slug}>
          <h3 className="line-clamp-2 text-xl">{title}</h3>
        </Link>
        <Link href={slug}>
          <p className="line-clamp-3 font-thin">{subTitle}</p>
        </Link>
      </div>

      <ul className="flex list-none flex-wrap gap-2">
        {tags.map((tag, index) => (
          <li key={index}>
            <Link
              href={`/tags/${tag}`}
              className={buttonVariants({ variant: "outline", size: "sm" })}
            >
              {tag}
            </Link>
          </li>
        ))}
      </ul>

      <div className="flex items-center justify-between">
        <div className="space-x-2">
          <span className="text-sm font-thin">On {formatDate(createdAt)}</span>
        </div>
        <div className="flex gap-2">
          <div className="flex items-center gap-1">
            <Icons.heart className="h-5 w-5 text-red-500" />
            <span className="text-sm font-thin">{likeCount}</span>
          </div>
          <div>
            <div className="flex items-center gap-1">
              <Icons.chat className="h-5 w-5" />
              <span className="text-sm font-thin">{commentCount}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
