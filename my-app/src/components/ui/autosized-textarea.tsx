"use client"

import React, { useEffect, useRef } from "react"
import autosize from "autosize"

import { cn } from "@/lib/utils"

interface AutosizedTextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

export function AutosizedTextarea({
  name,
  placeholder,
  value,
  className,
  ...props
}: AutosizedTextareaProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    if (textareaRef.current) autosize(textareaRef.current)
  }, [])

  return (
    <textarea
      ref={textareaRef}
      className={cn(
        "h-14 w-full resize-none border-0 bg-transparent text-3xl font-bold focus:!outline-none focus:ring-0",
        className
      )}
      name={name}
      placeholder={placeholder}
      value={value}
      {...props}
    />
  )
}
