<script lang="ts">
	import { page } from '$app/stores';
	import { browser } from '$app/environment';
	import { createInfiniteQuery } from '@tanstack/svelte-query';

	import type { Article } from '$lib/types/article';
	import { search } from '$lib/client-fetch/search';

	import ArticleItem from '$components/Article/ArticleItem/ArticleItem.svelte';
	import SearchTotal from './_SearchTotal/SearchTotal.svelte';
	import NoSearchResults from './_NoSearchResults/NoSearchResults.svelte';
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
		keepPreviousData: true,
		enabled: browser && !!q
	});
</script>

{#if $searchAritclesQuery.isSuccess && $searchAritclesQuery.data.pages[0].totalHits > 0}
	<div>
		<SearchTotal totalHits={$searchAritclesQuery.data.pages[0].totalHits} />
		<ul class="article-grid">
			{#each $searchAritclesQuery.data.pages as { data }}
				{#each data as article (article.id)}
					<li><ArticleItem {article} /></li>
				{/each}
			{/each}
			<InfiniteScroll
				fetchFn={$searchAritclesQuery.fetchNextPage}
				hasNextPage={$searchAritclesQuery.hasNextPage}
			/>
		</ul>
	</div>
{:else}
	<NoSearchResults />
{/if}
