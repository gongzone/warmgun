"use client"

import React, { useCallback, useEffect, useState } from "react"
import useEmblaCarousel from "embla-carousel-react"

import { type PickedArticle } from "@/lib/services/article/fetch"

import { ShowcaseItem } from "./showcase-item"
import { ShowcaseThumb } from "./showcase-thumb"

type ArticleShowcaseProps = {
  articles: PickedArticle[]
}

export const ArticleShowcase = ({ articles }: ArticleShowcaseProps) => {
  const [emblaMainRef, emblaMainApi] = useEmblaCarousel({ align: "center" })
  const [emblaThumbsRef, emblaThumbsApi] = useEmblaCarousel({
    containScroll: "keepSnaps",
    dragFree: true,
  })
  const [selectedIndex, setSelectedIndex] = useState(0)

  const onThumbClick = useCallback(
    (index: number) => {
      if (!emblaMainApi || !emblaThumbsApi) return
      emblaMainApi.scrollTo(index)
    },
    [emblaMainApi, emblaThumbsApi]
  )

  const onSelect = useCallback(() => {
    if (!emblaMainApi || !emblaThumbsApi) return
    setSelectedIndex(emblaMainApi.selectedScrollSnap())
    emblaThumbsApi.scrollTo(emblaMainApi.selectedScrollSnap())
  }, [emblaMainApi, emblaThumbsApi, setSelectedIndex])

  useEffect(() => {
    if (!emblaMainApi) return
    onSelect()
    emblaMainApi.on("select", onSelect)
    emblaMainApi.on("reInit", onSelect)
  }, [emblaMainApi, onSelect])

  return (
    <div className="rounded-md border bg-muted p-4">
      <div className="overflow-hidden" ref={emblaMainRef}>
        <ul className="flex [backface-visibility:hidden] [touch-action:pan-y]">
          {articles.map((article) => (
            <li
              className="mr-6 min-w-0 flex-[0_0_77%] min-[540px]:flex-[0_0_61%] md:flex-[0_0_40%] lg:flex-[0_0_70%]"
              key={article.id}
            >
              <ShowcaseItem article={article} />
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-4">
        <div className="overflow-hidden" ref={emblaThumbsRef}>
          <ul className="flex">
            {articles.map(({ id, thumbnail }, i) => (
              <li
                className="mr-4 min-w-0 flex-[0_0_32%] min-[540px]:flex-[0_0_20%] md:flex-[0_0_13%] lg:flex-[0_0_17%]"
                key={id}
              >
                <ShowcaseThumb
                  thumbnail={thumbnail}
                  selected={i === selectedIndex}
                  index={i}
                  onClick={() => onThumbClick(i)}
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
