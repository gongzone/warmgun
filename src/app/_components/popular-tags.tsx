import Link from "next/link"

import { fetchTags } from "@/lib/services/tag/fetch"
import { Button, buttonVariants } from "@/components/@ui/button"
import { DataFallback } from "@/components/@ui/data-fallback"

export const PopularTags = async () => {
  const popularTags = await fetchTags({ filter: "popular" })

  if (popularTags.length === 0) {
    return <DataFallback />
  }

  return (
    <ul className="flex flex-wrap justify-center gap-2">
      {popularTags.map((tag) => (
        <li key={tag.name}>
          <Link
            href={`tags/${tag.slug}`}
            className={buttonVariants({ size: "sm", radius: "full" })}
          >
            {tag.name}
          </Link>
        </li>
      ))}
    </ul>
  )
}
