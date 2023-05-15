"use client"

import React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import { IconProps } from "@/types/icon"
import { cn } from "@/lib/utils"

import { ArrowRightSimpleIcon } from "../@icons/ArrowRightSimple"

interface VerticalNavItemProps extends React.HTMLAttributes<HTMLAnchorElement> {
  title: string
  href: string
  Icon?: (props: IconProps) => JSX.Element
}

export const VerticalNavItem = React.forwardRef<
  HTMLAnchorElement,
  VerticalNavItemProps
>(({ className, title, href, Icon, ...props }, ref) => {
  const pathname = usePathname()
  const isActive = href === pathname
  return (
    <Link
      className={cn(
        "text-foreground/75 hover:text-foreground hover:bg-muted/50 flex w-full items-center justify-between rounded-lg px-4 py-3 transition-colors duration-300",
        isActive ? "text-foreground bg-muted" : "",
        className
      )}
      href={href}
      {...props}
    >
      <div className="flex items-center space-x-2">
        {Icon && <Icon className="h-5 w-5" />}
        <span>{title}</span>
      </div>
      <ArrowRightSimpleIcon className="h-5 w-5" />
    </Link>
  )
})
VerticalNavItem.displayName = "VerticalNavItem"
// ({
//   className,
//   title,
//   href,
//   Icon,
// }: VerticalNavItemProps) {
// const pathname = usePathname()
// const isActive = href === pathname

//   return (
//     <Link
//       className={cn(
//         "text-foreground/75 hover:text-foreground hover:bg-muted/50 flex w-full items-center justify-between rounded-lg px-4 py-3 transition-colors duration-300",
//         isActive ? "text-foreground bg-muted" : "",
//         className
//       )}
//       href={href}
//     >
//       <div className="flex items-center space-x-2">
//         {Icon && <Icon className="h-5 w-5" />}
//         <span>{title}</span>
//       </div>
//       <ArrowRightSimpleIcon className="h-5 w-5" />
//     </Link>
//   )
// }
