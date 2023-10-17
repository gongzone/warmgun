"use client"

import React, { useCallback, useEffect, useState } from "react"
import useEmblaCarousel, { type EmblaCarouselType } from "embla-carousel-react"

import { type UserDisplay } from "@/lib/services/user/fetch"

import { BloggerShocaseItem } from "./bloger-showcase-item"
import { DotButton, NextButton, PrevButton } from "./showcase-buttons"

type BlogerShowcaseProps = {
  users: UserDisplay[]
}

export const BlogerShowcase = ({ users }: BlogerShowcaseProps) => {
  const [emblaMainRef, emblaMainApi] = useEmblaCarousel({
    duration: 40,
    slidesToScroll: 1,
    loop: true,
    align: "start",
  })
  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true)
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true)
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([])

  const scrollPrev = useCallback(
    () => emblaMainApi && emblaMainApi.scrollPrev(),
    [emblaMainApi]
  )
  const scrollNext = useCallback(
    () => emblaMainApi && emblaMainApi.scrollNext(),
    [emblaMainApi]
  )
  const scrollTo = useCallback(
    (index: number) => emblaMainApi && emblaMainApi.scrollTo(index),
    [emblaMainApi]
  )

  const onInit = useCallback((emblaMainApi: EmblaCarouselType) => {
    setScrollSnaps(emblaMainApi.scrollSnapList())
  }, [])

  const onSelect = useCallback((emblaMainApi: EmblaCarouselType) => {
    setSelectedIndex(emblaMainApi.selectedScrollSnap())
    setPrevBtnDisabled(!emblaMainApi.canScrollPrev())
    setNextBtnDisabled(!emblaMainApi.canScrollNext())
  }, [])

  useEffect(() => {
    if (!emblaMainApi) return

    onInit(emblaMainApi)
    onSelect(emblaMainApi)
    emblaMainApi.on("reInit", onInit)
    emblaMainApi.on("reInit", onSelect)
    emblaMainApi.on("select", onSelect)
  }, [emblaMainApi, onInit, onSelect])

  return (
    <div>
      <div className="overflow-hidden" ref={emblaMainRef}>
        <ul className="flex [backface-visibility:hidden] [touch-action:pan-y]">
          {users.map((user) => (
            <li
              className="mr-6 min-w-0 flex-[0_0_77%] min-[540px]:flex-[0_0_61%] md:flex-[0_0_40%] lg:flex-[0_0_20%]"
              key={user.id}
            >
              <BloggerShocaseItem user={user} />
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-4 flex items-center justify-center gap-4">
        <PrevButton onClick={scrollPrev} disabled={prevBtnDisabled} />
        <ul className="flex items-center gap-2">
          {scrollSnaps.map((_, index) => (
            <li className="">
              <DotButton
                key={index}
                selected={index === selectedIndex}
                onClick={() => scrollTo(index)}
              />
            </li>
          ))}
        </ul>
        <NextButton onClick={scrollNext} disabled={nextBtnDisabled} />
      </div>
    </div>
  )
}
