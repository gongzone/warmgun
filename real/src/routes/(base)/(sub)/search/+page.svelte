<script lang="ts">
	import type { PageData } from './$types';
	import { createInfiniteQuery } from '@tanstack/svelte-query';

	import type { Article } from '$lib/types/article';
	import { api } from '$lib/api/api';

	import ArticleItem from '$components/Article/ArticleItem/ArticleItem.svelte';
	import NoSearchResults from './_NoSearchResults/NoSearchResults.svelte';
	import InfiniteScroll from '$components/@utils/InfiniteScroll.svelte';

	export let data: PageData;

	$: ({ q } = data);

	$: searchAritclesQuery = createInfiniteQuery({
		queryKey: ['search', 'articles', q, 12],
		queryFn: api().search<Article>,
		getNextPageParam: (lastPage) => lastPage.nextCursor,
		keepPreviousData: true,
		enabled: !!q
	});
</script>

{#if $searchAritclesQuery.isSuccess && $searchAritclesQuery.data.pages[0].data.length > 0}
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
{:else}
	<NoSearchResults />
{/if}
