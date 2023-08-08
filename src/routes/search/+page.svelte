<script lang="ts">
	import type { PageData } from './$types';
	import { createInfiniteQuery } from '@tanstack/svelte-query';

	import type { Article } from '$lib/types/article';
	import { api } from '$lib/api/api';

	import ArticleItem from '$components/@item/Article/ArticleItem.svelte';
	import NoSearchResults from './_NoSearchResults/NoSearchResults.svelte';
	import InfiniteScroll from '$components/@utils/InfiniteScroll.svelte';

	export let data: PageData;

	$: ({ q } = data);

	$: searchAritclesQuery = createInfiniteQuery({
		queryKey: ['search', 'articles', q, 12],
		queryFn: api().search<Article>,
		getNextPageParam: (lastPage) => lastPage.nextCursor,
		enabled: !!q
	});
</script>

{#if $searchAritclesQuery.isSuccess && $searchAritclesQuery.data.pages[0].data.length > 0}
	<ul class="flex flex-col">
		{#each $searchAritclesQuery.data.pages as { data }}
			{#each data as article (article.id)}
				<li><ArticleItem {article} /></li>
			{/each}
		{/each}
	</ul>
	<InfiniteScroll
		fetchFn={$searchAritclesQuery.fetchNextPage}
		hasNextPage={$searchAritclesQuery.hasNextPage}
	/>
{:else}
	<NoSearchResults />
{/if}
