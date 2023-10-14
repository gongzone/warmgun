import Image from "next/image"

import imageFallback from "@/lib/assets/image-fallback.png"
import { cn } from "@/lib/utils"

type ShowcaseThumbProps = {
  thumbnail: string | null
  selected: boolean
  index: number
  onClick: () => void
}

export const ShowcaseThumb = ({
  thumbnail,
  selected,
  index,
  onClick,
}: ShowcaseThumbProps) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "block w-full overflow-hidden rounded-lg transition-opacity [touch-action:manipulation]",
        selected ? "opacity-100" : "opacity-30"
      )}
      type="button"
    >
      <Image
        className="h-[85px] w-full"
        src={thumbnail ?? imageFallback}
        alt="thumb"
        width={200}
        height={200}
      />
    </button>
  )
}
