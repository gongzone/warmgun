import React from "react"
import { tv, type VariantProps } from "tailwind-variants"

const textWithIconVariants = tv({
  base: "inline-flex items-center",
  variants: {
    gap: {
      0.5: "gap-0.5",
      1: "gap-1",
      2: "gap-2",
      3: "gap-3",
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
  text: React.ReactNode
  icon: React.ReactNode
} & React.ComponentPropsWithoutRef<"div"> &
  VariantProps<typeof textWithIconVariants>

export const TextWithIcon = React.forwardRef<
  React.ElementRef<"div">,
  TextWithIconProps
>(({ className, gap, text, icon, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={textWithIconVariants({ gap, className })}
      {...props}
    >
      {icon}
      {text}
    </div>
  )
})
TextWithIcon.displayName = "TextWithIcon"
