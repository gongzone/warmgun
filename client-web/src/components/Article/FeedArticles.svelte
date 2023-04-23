<script lang="ts">
	import { createInfiniteQuery } from '@tanstack/svelte-query';

	import { findMyFeedArticles } from '$api/article';

	import ArticleList from './@ArticleList/ArticleList.svelte';
	import InfiniteScroll from '$components/@utility/InfiniteScroll.svelte';

	const feedArticlesQuery = createInfiniteQuery({
		queryKey: ['feedArticles'],
		queryFn: findMyFeedArticles,
		getNextPageParam: (lastPage) => lastPage.nextCursor
	});
</script>

{#if $feedArticlesQuery.isSuccess}
	{#if $feedArticlesQuery.data.pages[0].data.length > 0}
		<ul>
			{#each $feedArticlesQuery.data.pages as { data }}
				{#each data as article (article.id)}
					<li>
						<ArticleList {article} />
					</li>
				{/each}
			{/each}
		</ul>

		<InfiniteScroll
			fetchFn={$feedArticlesQuery.fetchNextPage}
			hasNextPage={$feedArticlesQuery.hasNextPage}
		/>
	{:else}
		<p>피드 기능을 이용하려면 블로거를 구독하세요!</p>
	{/if}
{/if}
