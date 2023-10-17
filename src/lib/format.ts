import { customAlphabet } from "nanoid"

import { dateClient } from "./date"

export function formatDate(
  date: Date,
  mode: "default" | "fromNow" = "default"
) {
  if (mode === "fromNow") {
    return dateClient(date).fromNow()
  }

  return dateClient(date).format("YYYY.MM.DD")
}

export function formatArticleSlug(title: string) {
  const nanoid = customAlphabet("1234567890abcdef", 10)

  return `${title
    .trim()
    .replace(/[^가-힣a-zA-Z0-9\s]/g, "")
    .replace(/\s+/g, "-")
    .toLowerCase()}-${nanoid()}`
}

export function formatTagSlug(tag: string) {
  return tag.trim().replace(/\s+/g, "-").toLowerCase()
}

export function formatExcerpt(text: string) {
  const maxLength = 200
  const excerpt = text.length >= maxLength ? text.slice(0, maxLength) : text

  return excerpt
}

export function formatReadingTime(text: string) {
  const wordsPerMinute = 265
  const words = text.trim().split(/\s+/).length
  const time = Math.ceil(words / wordsPerMinute)

  return time
}
