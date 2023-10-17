import { type ArticleDetail } from "@/lib/services/article/fetch"
import { Avatar } from "@/components/@ui/avatar"
import { Badge } from "@/components/@ui/badge"
import { Button } from "@/components/@ui/button"
import { Card } from "@/components/@ui/card"
import { Icons } from "@/components/@ui/icons"

type ArticleInfoProps = {
  article: ArticleDetail
}

export const ArticleEnd = ({ article }: ArticleInfoProps) => {
  return (
    <div>
      {article.tags.length > 0 ? (
        <ul className="mb-4">
          {article.tags.map((tag) => (
            <li key={tag.id}>
              <Badge>{tag.name}</Badge>
            </li>
          ))}
        </ul>
      ) : null}

      <div>
        <Button radius="full">
          <Icons.Heart className="h-4 w-4" />
          {article._count.likedBy}
        </Button>
      </div>
    </div>
  )
}
