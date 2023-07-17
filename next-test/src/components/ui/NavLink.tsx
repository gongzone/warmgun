"use client"

import Link, { LinkProps } from "next/link"
import { usePathname } from "next/navigation"

import { cn } from "@/lib/utils/cn"

interface NavLinkProps extends LinkProps {
  children: React.ReactNode
}

export const NavLink = ({ href, children, ...props }: NavLinkProps) => {
  const pathname = usePathname()
  const classesActive = href === pathname ? "opacity-100" : "opacity-75"

  return (
    <Link
      href={href}
      className={cn(
        "text-sm font-semibold hover:opacity-100 transition-opacity",
        classesActive
      )}
      {...props}
    >
      {children}
    </Link>
  )
}
