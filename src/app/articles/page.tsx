import { fetchArticles } from "@/lib/services/article/fetch"
import { ArticleListItem } from "@/components/article/article-list-item"

export default async function RecentArticlesPage() {
  const recentArticles = await fetchArticles({ filter: "recent" })

  return (
    <div>
      <ul>
        {recentArticles.map((article) => (
          <li key={article.id}>
            <ArticleListItem article={article} />
          </li>
        ))}
      </ul>
    </div>
  )
}
