import { fetchPickedArticles } from "@/lib/services/article/fetch"

import { ArticleShowcase } from "./article-showcase"
import { SiteWords } from "./site-words"

export const HomeHero = async () => {
  const pickedArticles = await fetchPickedArticles()

  return (
    <div className="grid grid-cols-1 items-center gap-8 md:gap-10 lg:grid-cols-2">
      <SiteWords />
      <ArticleShowcase articles={pickedArticles} />
    </div>
  )
}
