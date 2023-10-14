import React from "react"
import { tv, type VariantProps } from "tailwind-variants"

import { Icons } from "./icons"
import { Text } from "./text"

const textWithIconVariants = tv({
  base: "inline-flex items-center",
  variants: {
    gap: {
      0.5: "gap-0.5",
      1: "gap-1",
      1.5: "gap-1.5",
      2: "gap-2",
      2.5: "gap-2.5",
      3: "gap-3",
      3.5: "gap-3.5",
      4: "gap-4",
      5: "gap-5",
      6: "gap-6",
      7: "gap-7",
      8: "gap-8",
      9: "gap-9",
    },
  },
  defaultVariants: {
    gap: 1,
  },
})

type TextWithIconProps = {
  icon: (icons: typeof Icons) => React.ReactNode
  text: (text: typeof Text) => React.ReactNode
} & React.ComponentPropsWithoutRef<"div"> &
  VariantProps<typeof textWithIconVariants>

export const TextWithIcon = React.forwardRef<
  React.ElementRef<"div">,
  TextWithIconProps
>(
  (
    { className, gap, text: generateText, icon: generateIcon, ...props },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={textWithIconVariants({ gap, className })}
        {...props}
      >
        {generateIcon(Icons)}
        {generateText(Text)}
      </div>
    )
  }
)
TextWithIcon.displayName = "TextWithIcon"
