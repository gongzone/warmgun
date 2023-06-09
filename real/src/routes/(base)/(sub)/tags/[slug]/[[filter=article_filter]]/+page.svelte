<script lang="ts">
	import type { PageData } from './$types';
	import { page } from '$app/stores';
	import { createInfiniteQuery } from '@tanstack/svelte-query';

	import { api } from '$lib/api/api';

	import ArticleItem from '$components/Article/ArticleItem/ArticleItem.svelte';
	import InfiniteScroll from '$components/@utils/InfiniteScroll.svelte';
	import NoDataCard from '$components/@ui/NoDataCard.svelte';

	export let data: PageData;

	$: ({ tag } = data);

	$: articlesByTagQuery = createInfiniteQuery({
		queryKey: ['articles', 'tags', tag.id, $page.params.filter, 12],
		queryFn: api().findArticles,
		getNextPageParam: (lastPage) => lastPage.nextCursor,
		keepPreviousData: true
	});
</script>

{#if $articlesByTagQuery.isSuccess && $articlesByTagQuery.data.pages[0].data.length > 0}
	<ul class="article-grid">
		{#each $articlesByTagQuery.data.pages as { data }}
			{#each data as article (article.id)}
				<li><ArticleItem {article} /></li>
			{/each}
		{/each}
	</ul>
	<InfiniteScroll
		fetchFn={$articlesByTagQuery.fetchNextPage}
		hasNextPage={$articlesByTagQuery.hasNextPage}
	/>
{:else}
	<NoDataCard text="아티클이 존재하지 않습니다!" />
{/if}
