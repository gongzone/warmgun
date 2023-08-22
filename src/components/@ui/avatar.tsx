"use client"

import * as React from "react"
import * as AvatarPrimitive from "@radix-ui/react-avatar"
import { tv, type VariantProps } from "tailwind-variants"

import { cn } from "@/lib/utils"

const avatarVariants = tv(
  {
    base: "relative flex shrink-0 overflow-hidden",
    variants: {
      size: {
        xs: "w-6 h-6",
        sm: "w-8 h-8",
        md: "w-10 h-10",
        lg: "w-14 h-14",
        xl: "w-20 h-20",
      },
      border: {
        true: "ring-2 ring-muted ring-offset-2 outline-none",
      },
      radius: {
        sm: "rounded-sm",
        md: "rounded-md",
        lg: "rounded-lg",
        xl: "rounded-xl",
        full: "rounded-full",
      },
    },
    defaultVariants: {
      size: "md",
      radius: "full",
    },
  },
  {
    responsiveVariants: ["sm", "md", "lg", "xl", "2xl"],
  }
)

const AvatarIcon = () => {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      height="80%"
      role="presentation"
      viewBox="0 0 24 24"
      width="80%"
    >
      <path
        d="M12 2C9.38 2 7.25 4.13 7.25 6.75C7.25 9.32 9.26 11.4 11.88 11.49C11.96 11.48 12.04 11.48 12.1 11.49C12.12 11.49 12.13 11.49 12.15 11.49C12.16 11.49 12.16 11.49 12.17 11.49C14.73 11.4 16.74 9.32 16.75 6.75C16.75 4.13 14.62 2 12 2Z"
        fill="currentColor"
      ></path>
      <path
        d="M17.0809 14.1489C14.2909 12.2889 9.74094 12.2889 6.93094 14.1489C5.66094 14.9989 4.96094 16.1489 4.96094 17.3789C4.96094 18.6089 5.66094 19.7489 6.92094 20.5889C8.32094 21.5289 10.1609 21.9989 12.0009 21.9989C13.8409 21.9989 15.6809 21.5289 17.0809 20.5889C18.3409 19.7389 19.0409 18.5989 19.0409 17.3589C19.0309 16.1289 18.3409 14.9889 17.0809 14.1489Z"
        fill="currentColor"
      ></path>
    </svg>
  )
}

type AvatarElementType = React.ElementRef<typeof AvatarPrimitive.Root>
interface AvatarProps
  extends React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>,
    VariantProps<typeof avatarVariants> {
  src?: string | null
  alt?: string
  imgProps?: Omit<React.ImgHTMLAttributes<HTMLImageElement>, "src" | "alt">
  imgClasses?: string
  fallback?: React.ReactNode
  fallbackClasses?: string
}

const Avatar = React.forwardRef<AvatarElementType, AvatarProps>(
  (
    {
      className,
      size,
      border,
      radius,
      src,
      alt,
      imgProps,
      imgClasses,
      fallback: fallbackComponent,
      fallbackClasses,
      ...props
    },
    fowardedRef
  ) => {
    return (
      <AvatarPrimitive.Root
        ref={fowardedRef}
        className={avatarVariants({ size, border, radius, className })}
        {...props}
      >
        <AvatarPrimitive.Image
          className={cn("aspect-square h-full w-full", imgClasses)}
          src={src ? src : undefined}
          alt={alt}
          {...imgProps}
        />
        <AvatarPrimitive.Fallback
          className={cn(
            "bg-muted text-muted-foreground flex h-full w-full items-center justify-center rounded-full",
            fallbackClasses
          )}
        >
          {fallbackComponent ? fallbackComponent : <AvatarIcon />}
        </AvatarPrimitive.Fallback>
      </AvatarPrimitive.Root>
    )
  }
)
Avatar.displayName = AvatarPrimitive.Root.displayName

export { Avatar, avatarVariants }
