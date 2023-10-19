import { fetchArticles } from "@/lib/services/article/fetch"
import { ArticleInfiniteScroll } from "@/components/article/article-infinite-scroll"

export default async function BestArticlesPage() {
  const bestArticles = await fetchArticles({ filter: "best", take: 10 })

  return (
    <div>
      <ArticleInfiniteScroll
        init={bestArticles}
        options={{ filter: "best", take: 10 }}
      />
    </div>
  )
}
