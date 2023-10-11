import React from "react"
import Image from "next/image"

type PropType = {
  selected: boolean
  imgSrc: string
  index: number
  onClick: () => void
}

export const Thumb: React.FC<PropType> = (props) => {
  const { selected, imgSrc, index, onClick } = props

  return (
    <div
      className={"embla-thumbs__slide".concat(
        selected ? " embla-thumbs__slide--selected" : ""
      )}
    >
      <button
        onClick={onClick}
        className="embla-thumbs__slide__button overflow-hidden rounded-lg"
        type="button"
      >
        <div className="embla-thumbs__slide__number items-center justify-center">
          <span>{index + 1}</span>
        </div>
        <img
          className="embla-thumbs__slide__img !h-[90px]"
          src={imgSrc}
          alt="Your alt text"
        />
      </button>
    </div>
  )
}