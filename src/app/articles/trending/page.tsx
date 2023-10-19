import { fetchArticles } from "@/lib/services/article/fetch"
import { ArticleInfiniteScroll } from "@/components/article/article-infinite-scroll"

export default async function TrendingArticlesPage() {
  const trendingArticles = await fetchArticles({ filter: "trending", take: 10 })

  return (
    <div>
      <ArticleInfiniteScroll
        init={trendingArticles}
        options={{ filter: "trending", take: 10 }}
      />
    </div>
  )
}
