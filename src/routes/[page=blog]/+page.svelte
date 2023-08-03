<script lang="ts">
	import { page } from '$app/stores';
	import ArticleCard from '$components/@item/Article/ArticleCard.svelte';
	import { TabAnchor, TabGroup } from '@skeletonlabs/skeleton';
	import { categories } from '$lib/constants/categories';
	import Sortor from '$components/@ui/Sortor.svelte';
	import type { PageData } from './$types';
	import InfiniteScroll from '$components/@utils/InfiniteScroll.svelte';
	import { createInfiniteQuery } from '@tanstack/svelte-query';
	import { api } from '$lib/api/api';

	export let data: PageData;

	$: articlesQuery = createInfiniteQuery({
		queryKey: ['articles', $page.params.page.slice(1), 'recent', 10],
		queryFn: api().findArticlesByUsername,
		getNextPageParam: (lastPage) => lastPage.nextCursor
	});
</script>

{#if $articlesQuery.isSuccess && $articlesQuery.data.pages[0].data.length > 0}
	<ul class="grid grid-cols-3 gap-8">
		{#each $articlesQuery.data.pages as { data }, i (i)}
			{#each data as article (article.id)}
				<li>
					<ArticleCard {article} />
				</li>
			{/each}
		{/each}
	</ul>

	<InfiniteScroll fetchFn={$articlesQuery.fetchNextPage} hasNextPage={$articlesQuery.hasNextPage} />
{/if}
