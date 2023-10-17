import Image from "next/image"

import { cn } from "@/lib/utils"

type ShowcaseThumbProps = {
  thumbnail: string
  selected: boolean
  onClick: () => void
}

export const ArticleShowcaseThumb = ({
  thumbnail,
  selected,
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
        src={thumbnail}
        alt="thumb"
        width={200}
        height={200}
      />
    </button>
  )
}
