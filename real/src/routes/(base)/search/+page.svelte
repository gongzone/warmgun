<script lang="ts">
	import type { PageData } from './$types';
	import { browser } from '$app/environment';
	import { createInfiniteQuery } from '@tanstack/svelte-query';

	import type { Article } from '$lib/types/article';
	import { search } from '$lib/client-fetch/search';

	import ArticleGrid from '$components/Article/ArticleGrid.svelte';
	import ArticleItem from '$components/Article/ArticleItem/ArticleItem.svelte';
	import SearchTotal from './_SearchTotal/SearchTotal.svelte';
	import NoSearchResults from './_NoSearchResults/NoSearchResults.svelte';
	import InfiniteScroll from '$components/@utils/InfiniteScroll.svelte';

	export let data: PageData;

	$: ({ q } = data);

	$: searchAritclesQuery = createInfiniteQuery({
		queryKey: ['search', 'articles', q],
		queryFn: () =>
			search<Article[]>(q, {
				mode: 'articles',
				take: 12,
				cursor: 0
			}),
		getNextPageParam: (lastPage) => lastPage.nextCursor,
		keepPreviousData: true,
		enabled: browser && !!q
	});

	$: console.log($searchAritclesQuery.data);
</script>

{#if $searchAritclesQuery.isSuccess && $searchAritclesQuery.data.pages[0].totalHits > 0}
	<div>
		<SearchTotal totalHits={$searchAritclesQuery.data.pages[0].totalHits} />
		{#each $searchAritclesQuery.data.pages as { data }}
			<ArticleGrid items={data} let:item>
				<ArticleItem article={item} />
			</ArticleGrid>
		{/each}
		<InfiniteScroll
			fetchFn={$searchAritclesQuery.fetchNextPage}
			hasNextPage={$searchAritclesQuery.hasNextPage}
		/>
	</div>
{:else}
	<NoSearchResults />
{/if}
