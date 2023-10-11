"use client"

import React, { useCallback, useEffect, useState } from "react"
import Image from "next/image"
import useEmblaCarousel, { EmblaOptionsType } from "embla-carousel-react"
import { flushSync } from "react-dom"

import { ArticleItem } from "../article/article-item"
import {
  NextButton,
  PrevButton,
  usePrevNextButtons,
} from "./carousel-arrow-button"
import { DotButton, useDotButton } from "./carousel-dot-button"

import "./carousel.css"

import Link from "next/link"

import { AspectRatio } from "./aspect-ratio"
import { Avatar } from "./avatar"
import { Thumb } from "./carousel-thumb-button"

const TWEEN_FACTOR = 4.2

const numberWithinRange = (number: number, min: number, max: number): number =>
  Math.min(Math.max(number, min), max)

type PropType = {
  options?: EmblaOptionsType
  children?: React.ReactNode
  images?: string[]
  items?: unknown
}

export const Carousel: React.FC<PropType> = (props) => {
  const { options = { align: "center" }, children, images, items } = props
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [emblaMainRef, emblaMainApi] = useEmblaCarousel(options)
  const [tweenValues, setTweenValues] = useState<number[]>([])
  const [emblaThumbsRef, emblaThumbsApi] = useEmblaCarousel({
    containScroll: "keepSnaps",
    dragFree: true,
  })

  const onThumbClick = useCallback(
    (index: number) => {
      if (!emblaMainApi || !emblaThumbsApi) return
      emblaMainApi.scrollTo(index)
    },
    [emblaMainApi, emblaThumbsApi]
  )
  const onScroll = useCallback(() => {
    if (!emblaMainApi) return

    const engine = emblaMainApi.internalEngine()
    const scrollProgress = emblaMainApi.scrollProgress()

    const styles = emblaMainApi.scrollSnapList().map((scrollSnap, index) => {
      let diffToTarget = scrollSnap - scrollProgress

      if (engine.options.loop) {
        engine.slideLooper.loopPoints.forEach((loopItem) => {
          const target = loopItem.target()
          if (index === loopItem.index && target !== 0) {
            const sign = Math.sign(target)
            if (sign === -1) diffToTarget = scrollSnap - (1 + scrollProgress)
            if (sign === 1) diffToTarget = scrollSnap + (1 - scrollProgress)
          }
        })
      }
      const tweenValue = 1 - Math.abs(diffToTarget * TWEEN_FACTOR)
      return numberWithinRange(tweenValue, 0, 1)
    })
    setTweenValues(styles)
  }, [emblaMainApi, setTweenValues])

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

  // const { selectedIndex, scrollSnaps, onDotButtonClick } =
  //   useDotButton(emblaMainApi)

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaMainApi)

  return (
    <div className="embla rounded-md border">
      <div className="embla__viewport" ref={emblaMainRef}>
        <div className="embla__container ">
          {items.map(({ article, user }, index) => (
            <div className="embla__slide" key={article.id}>
              <div className="relative h-[215px] w-full">
                <div className="absolute top-1 z-10 w-full p-3"></div>
                <AspectRatio ratio={16 / 12} className="h-[215px] w-full">
                  <Image
                    className="object-cover"
                    src={article.thumbnail ?? ""}
                    alt={article.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </AspectRatio>
                <div className="absolute bottom-0 w-full border-t border-t-black/50 bg-black/40 p-3 text-white/75 backdrop-blur backdrop-saturate-150">
                  <div className="mb-1 flex items-center gap-1.5">
                    <Avatar src={user.avatar} size="xs" />
                    <span className="text-sm text-white/75">
                      {user.username}
                    </span>
                  </div>
                  <Link href="/sd" className="line-clamp-1 inline font-medium">
                    {article.title}
                  </Link>
                  <p className="line-clamp-2 text-sm font-light">
                    {article.excerpt}
                  </p>
                </div>
              </div>
            </div>
          ))}
          {/* <div className="embla__slide" key={index}></div> */}
        </div>
      </div>

      <div className="embla-thumbs">
        <div className="embla-thumbs__viewport" ref={emblaThumbsRef}>
          <div className="embla-thumbs__container">
            {images?.map((image, index) => (
              <Thumb
                onClick={() => onThumbClick(index)}
                selected={index === selectedIndex}
                index={index}
                imgSrc={image}
                key={index}
              />
            ))}
          </div>
        </div>
      </div>

      {/* <div className="embla__buttons">
        <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
        <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
      </div> */}

      {/* <div className="embla__dots">
        {scrollSnaps.map((_, index) => (
          <DotButton
            key={index}
            onClick={() => onDotButtonClick(index)}
            className={"embla__dot".concat(
              index === selectedIndex ? " embla__dot--selected" : ""
            )}
          />
        ))}
      </div> */}
    </div>
  )
}
