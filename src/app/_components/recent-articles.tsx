import { fetchArticles } from "@/lib/services/article/fetch"
import { DataFallback } from "@/components/@ui/data-fallback"
import { ArticleCardItem } from "@/components/article/article-card-item"

export const RecentArticles = async () => {
  const recentArticles = await fetchArticles({ filter: "recent", take: 8 })

  if (recentArticles.length === 0) {
    return <DataFallback />
  }

  return (
    <ul className="grid grid-cols-1 gap-7 min-[552px]:grid-cols-2 min-[552px]:gap-6 min-[805px]:grid-cols-3 min-[805px]:gap-7 min-[1158px]:grid-cols-4 min-[1158px]:gap-9">
      {recentArticles.map((article) => (
        <li key={article.id}>
          <ArticleCardItem article={article} />
        </li>
      ))}
    </ul>
  )
}
