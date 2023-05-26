<script lang="ts">
	import { page } from '$app/stores';
	import { createInfiniteQuery } from '@tanstack/svelte-query';

	import type { Article } from '$lib/types/article';
	import { search } from '$lib/client-fetch/search';
	import ArticleGrid from '$components/Article/ArticleGrid.svelte';
	import ArticleItem from '$components/Article/ArticleItem/ArticleItem.svelte';
	import InfiniteScroll from '$components/@utils/InfiniteScroll.svelte';
	import type { Tag } from '$lib/types/tag';

	$: q = $page.url.searchParams.get('q');

	$: searchTagQuery = createInfiniteQuery({
		queryKey: ['search', 'tags', q],
		queryFn: () =>
			search<Tag[]>(q, {
				mode: 'articles',
				take: 12,
				cursor: 0
			}),
		getNextPageParam: (lastPage) => lastPage.nextCursor,
		keepPreviousData: true
	});

	$: console.log($searchTagQuery.data);
</script>

{#if $searchTagQuery.isSuccess && $searchTagQuery.data.pages.length > 0}
	{#each $searchTagQuery.data.pages as { data }}
		<ul>
			{#each $searchTagQuery.data.pages as { data }}
				{#each data as tag (tag.id)}
					<li>{tag.name}</li>
				{/each}
			{/each}
		</ul>
	{/each}
	<InfiniteScroll
		fetchFn={$searchTagQuery.fetchNextPage}
		hasNextPage={$searchTagQuery.hasNextPage}
	/>
{/if}
