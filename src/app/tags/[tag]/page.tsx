import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query"

import { fetchArticles } from "@/lib/services/article/fetch"

import { TagArticles } from "./_components/tag-articles"

type TrendingTagArticlesProps = {
  params: { tag: string }
}

export default async function TrendingTagArticlesPage({
  params,
}: TrendingTagArticlesProps) {
  const tagSlug = decodeURIComponent(params.tag)
  const queryClient = new QueryClient()

  await queryClient.prefetchInfiniteQuery({
    queryKey: ["trending-articles", { by: "tag-slug", key: tagSlug }],
    queryFn: ({ pageParam }) =>
      fetchArticles({
        where: { tags: { some: { slug: tagSlug } } },
        filter: "trending",
        take: 10,
        cursor: pageParam,
      }),
    initialPageParam: null,
    getNextPageParam: (lastPage: any) => lastPage[lastPage.length - 1]?.id,
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <TagArticles filter="trending" tagSlug={tagSlug} />
    </HydrationBoundary>
  )
}
