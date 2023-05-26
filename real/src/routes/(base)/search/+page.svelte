<script lang="ts">
	import { page } from '$app/stores';
	import { createInfiniteQuery } from '@tanstack/svelte-query';

	import type { Article } from '$lib/types/article';
	import { search } from '$lib/client-fetch/search';
	import ArticleGrid from '$components/Article/ArticleGrid.svelte';
	import ArticleItem from '$components/Article/ArticleItem/ArticleItem.svelte';
	import InfiniteScroll from '$components/@utils/InfiniteScroll.svelte';

	$: q = $page.url.searchParams.get('q');

	$: searchAritclesQuery = createInfiniteQuery({
		queryKey: ['search', 'articles', q],
		queryFn: () =>
			search<Article[]>(q, {
				mode: 'articles',
				take: 12,
				cursor: 0
			}),
		getNextPageParam: (lastPage) => lastPage.nextCursor,
		keepPreviousData: true
	});

	$: console.log($searchAritclesQuery.data);
</script>

{#if $searchAritclesQuery.isSuccess && $searchAritclesQuery.data.pages}
	{#each $searchAritclesQuery.data.pages as { data }}
		<ArticleGrid items={data} let:item>
			<ArticleItem article={item} />
		</ArticleGrid>
	{/each}
	<InfiniteScroll
		fetchFn={$searchAritclesQuery.fetchNextPage}
		hasNextPage={$searchAritclesQuery.hasNextPage}
	/>
{/if}
