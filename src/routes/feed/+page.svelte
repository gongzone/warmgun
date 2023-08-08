<script lang="ts">
	import { createInfiniteQuery } from '@tanstack/svelte-query';

	import { api } from '$lib/api/api';
	import InfiniteScroll from '$components/@utils/InfiniteScroll.svelte';
	import ArticleItem from '$components/@item/Article/ArticleItem.svelte';

	const feedArticlesQuery = createInfiniteQuery({
		queryKey: ['articles', 'feed', 10],
		queryFn: api().findFeedArticles,
		getNextPageParam: (lastPage) => lastPage.nextCursor
	});
</script>

{#if $feedArticlesQuery.isSuccess && $feedArticlesQuery.data.pages[0].data.length > 0}
	<div>
		<ul class="flex flex-col">
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
	<p class="text-center mt-8">관심있는 블로거나 태그를 구독해보세요.</p>
{/if}
