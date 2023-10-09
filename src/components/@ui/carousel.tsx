"use client"

import React from "react"
import useEmblaCarousel, { EmblaOptionsType } from "embla-carousel-react"

import { ArticleItem } from "../article/article-item"
import {
  NextButton,
  PrevButton,
  usePrevNextButtons,
} from "./carousel-arrow-button"
import { DotButton, useDotButton } from "./carousel-dot-button"

import "./carousel.css"

type PropType = {
  slides: number[]
  options?: EmblaOptionsType
}

export const Carousel: React.FC<PropType> = (props) => {
  const { slides, options = { align: "start" } } = props
  const [emblaRef, emblaApi] = useEmblaCarousel(options)

  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi)

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi)

  return (
    <div className="embla">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container ">
          {slides.map((index) => (
            <div className="embla__slide" key={index}>
              <div className="h-[430px]">
                <ArticleItem
                  article={{
                    title: `테스트용 아티클입니다. 굉장히 재미있는 개발이군요.. - ${
                      index + 1
                    }`,
                    excerpt:
                      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum modi pariatur alias. Natus animi in officiis nesciunt laborum reiciendis est voluptatibus nihil sunt! Sit optio inventore laudantium eveniet aperiam non. imi in officiis nesciunt laborum reiciendis est voluptatibus nihil sunt! Sit optio inventore laudantium eveniet aperiam non imi in officiis nesciunt laborum reiciendis est voluptatibus nihil sunt! Sit optio inventore laudantium eveniet aperiam non",
                    thumbnail: `https://picsum.photos/id/${
                      (index + 1) * 27
                    }/${1200}/${800}`,
                    user: {
                      username: `테스트용 계정 ${index + 1}`,
                      avatar: "https://i.pravatar.cc/300",
                    },
                    tags: ["Svelte", "Typescript"],
                    createdAt: new Date(),
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="embla__buttons">
        <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
        <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
      </div>

      <div className="embla__dots">
        {scrollSnaps.map((_, index) => (
          <DotButton
            key={index}
            onClick={() => onDotButtonClick(index)}
            className={"embla__dot".concat(
              index === selectedIndex ? " embla__dot--selected" : ""
            )}
          />
        ))}
      </div>
    </div>
  )
}
