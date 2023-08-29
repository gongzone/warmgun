"use client"

import { Article } from "@/lib/types/article"

import { ShowcaseAnimation } from "./showcase-animation"
import { ShowcaseArticle } from "./showcase-article"
import { ShowcaseProvider } from "./showcase-context"
import { ShowcaseController } from "./showcase-controller"

interface ArticleShowcaseProps {
  articles: Article[]
}

const ArticleShowcase = ({ articles }: ArticleShowcaseProps) => {
  return (
    <ShowcaseProvider>
      <div className="relative min-h-[405px]">
        <ul>
          {articles.map((article, i) => (
            <li key={article.id}>
              <ShowcaseAnimation index={i}>
                <ShowcaseArticle index={i} article={article} />
              </ShowcaseAnimation>
            </li>
          ))}
        </ul>
      </div>
      <ShowcaseController
        className="mt-6 justify-center xl:absolute xl:bottom-0 xl:right-0"
        itemLength={articles.length}
      />
    </ShowcaseProvider>
  )
}

export { ArticleShowcase }
