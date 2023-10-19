import { fetchArticles } from "@/lib/services/article/fetch"
import { ArticleInfiniteScroll } from "@/components/article/article-infinite-scroll"

export default async function PickedArticlesPage() {
  const pickedArticles = await fetchArticles({ filter: "picked", take: 10 })

  return (
    <div>
      <ArticleInfiniteScroll
        init={pickedArticles}
        options={{ filter: "picked", take: 10 }}
      />
    </div>
  )
}
