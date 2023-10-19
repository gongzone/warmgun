import { fetchArticles } from "@/lib/services/article/fetch"
import { ArticleInfiniteScroll } from "@/components/article/article-infinite-scroll"

export default async function RecentArticlesPage() {
  const recentArticles = await fetchArticles({ filter: "recent", take: 10 })

  return (
    <div>
      <ArticleInfiniteScroll
        init={recentArticles}
        options={{ filter: "recent", take: 10 }}
      />
    </div>
  )
}
