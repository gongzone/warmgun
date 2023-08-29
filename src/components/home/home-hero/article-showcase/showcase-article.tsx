import Image from "next/image"

import { Article } from "@/lib/types/article"

import { useShowcase } from "./showcase-context"

interface ShowcaseArticle {
  article: Article
  index: number
}

const ShowcaseArticle = ({ article, index }: ShowcaseArticle) => {
  const [currentIndex] = useShowcase()

  return (
    <div>
      <Image
        src={article.thumbnail ?? ""}
        alt={article.title}
        loading="lazy"
        fill
        className={`object-cover`}
      />
    </div>
  )
}

export { ShowcaseArticle }
