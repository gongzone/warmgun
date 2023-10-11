import Image from "next/image"
import { type Article } from "@/db/schema/article"

import { fetchPickedArticles } from "@/lib/services/article/fetch"
import { AspectRatio } from "@/components/@ui/aspect-ratio"
import { Carousel } from "@/components/@ui/carousel"

export const ArticleShowcase = async () => {
  const pickedArticles = await fetchPickedArticles()

  return (
    <div className="w-full">
      <Carousel
        images={pickedArticles.map(({ article }) => article.thumbnail!)}
        items={pickedArticles}
      >
        {pickedArticles.map((article) => (
          <div className="embla__slide" key={article.id}>
            <ArticleShowcaseItem article={article} />
          </div>
        ))}
      </Carousel>
    </div>
  )
}

type ArticleShowcaseItemProps = {
  article: Article & User
}

const ArticleShowcaseItem = ({ article }: ArticleShowcaseItemProps) => {
  return (
    <div className="h-[180px] w-full">
      <AspectRatio ratio={16 / 12} className="h-[180px] w-full">
        <Image
          className="object-cover"
          src={article.thumbnail ?? ""}
          alt={article.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </AspectRatio>
    </div>
  )
}
