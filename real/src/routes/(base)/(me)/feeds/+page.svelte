<script lang="ts">
	import { createInfiniteQuery } from '@tanstack/svelte-query';

	import { api } from '$lib/api/api';
	import ArticleItem from '$components/Article/ArticleItem/ArticleItem.svelte';
	import InfiniteScroll from '$components/@utils/InfiniteScroll.svelte';

	$: feedArticlesQuery = createInfiniteQuery({
		queryKey: ['articles', 'feeds', 'feed', '', 12],
		queryFn: api().findArticles,
		getNextPageParam: (lastPage) => lastPage.nextCursor,
		keepPreviousData: true
	});
</script>

{#if $feedArticlesQuery.isSuccess && $feedArticlesQuery.data.pages[0].data.length > 0}
	<div>
		<ul class="article-grid">
			{#each $feedArticlesQuery.data.pages as { data }}
				{#each data as article (article.id)}
					<li><ArticleItem {article} /></li>
				{/each}
			{/each}
		</ul>
		<InfiniteScroll
			fetchFn={$feedArticlesQuery.fetchNextPage}
			hasNextPage={$feedArticlesQuery.hasNextPage}
		/>
	</div>
{:else}
	<p class="text-center">관심있는 블로거를 구독해보세요.</p>
{/if}
