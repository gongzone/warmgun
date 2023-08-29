import { useState, type ComponentProps, type PointerEvent } from "react"

import { useShowcase } from "./showcase-context"

const MAX_W = 270
const MIN_W = 200
const MAX_H = 405
const MIN_H = 300

interface ShowcaseAnimationProps extends ComponentProps<"div"> {
  index: number
}

const ShowcaseAnimation = ({
  children,
  index,
  ...props
}: ShowcaseAnimationProps) => {
  const [currentIndex] = useShowcase()
  const [angle, setAngle] = useState(0)

  const calculateWidth = (currentIndex: number, i: number) => {
    return i === currentIndex ? MAX_W : MIN_W
  }

  const calculateHeight = (currentIndex: number, i: number) => {
    return i === currentIndex ? MAX_H : MIN_H
  }

  const calculateX = (currentIndex: number, i: number) => {
    if (i === currentIndex) {
      return 0
    } else if (i < currentIndex) {
      return -(currentIndex - i) * (MIN_W * 1.1)
    } else {
      return MIN_W * (i - currentIndex) * 1.1 + (MAX_W - MIN_W)
    }
  }

  const handlePointerMove = (e: PointerEvent<HTMLDivElement>) => {
    const target = e.currentTarget

    const computedStyle = getComputedStyle(target)
    const transformMatrix = computedStyle.transform.split(", ")
    const translateXValue = parseFloat(transformMatrix[4])

    if (translateXValue !== 0) {
      return undefined
    }

    requestAnimationFrame(() => {
      const pageX = e.pageX
      const box = target.getBoundingClientRect()
      const centerPosition = {
        x: box.left + box.width / 2,
        y: box.top + box.height / 2,
      }

      setAngle(Math.atan2(pageX - centerPosition.x, 0) * (30 / Math.PI))
    })
  }

  const handlePointerOut = (e: PointerEvent<HTMLDivElement>) => {
    requestAnimationFrame(() => {
      setAngle(0)
    })
  }

  return (
    <div
      className="absolute left-0 top-0 overflow-hidden border border-foreground shadow-xl transition-all duration-1000 ease-in-out"
      style={{
        width: `${calculateWidth(currentIndex, index)}px`,
        height: `${calculateHeight(currentIndex, index)}px`,
        transform: `rotateY(${angle}deg) translateX(${calculateX(
          currentIndex,
          index
        )}px)`,
        pointerEvents: index === currentIndex ? "auto" : "none",
      }}
      onPointerMove={index === currentIndex ? handlePointerMove : undefined}
      onPointerOut={index === currentIndex ? handlePointerOut : undefined}
      {...props}
    >
      {children}
    </div>
  )
}

export { ShowcaseAnimation }
