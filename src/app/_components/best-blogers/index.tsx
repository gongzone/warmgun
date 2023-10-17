import { fetchUsers } from "@/lib/services/user/fetch"
import { DataFallback } from "@/components/@ui/data-fallback"

import { BlogerShowcase } from "./bloger-showcase"

export const BestBlogers = async () => {
  const bestBlogers = await fetchUsers({ filter: "best" })

  if (bestBlogers.length === 0) {
    return <DataFallback />
  }

  return <BlogerShowcase users={bestBlogers} />
}
