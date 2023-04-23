<script lang="ts">
	import { createInfiniteQuery } from '@tanstack/svelte-query';

	import { findMyLikeArticles } from '$api/article';

	import ArticleList from './@ArticleList/ArticleList.svelte';
	import InfiniteScroll from '$components/@utility/InfiniteScroll.svelte';

	const likeArticlesQuery = createInfiniteQuery({
		queryKey: ['likeArticles'],
		queryFn: findMyLikeArticles,
		getNextPageParam: (lastPage) => lastPage.nextCursor
	});
</script>

{#if $likeArticlesQuery.isSuccess}
	{#if $likeArticlesQuery.data.pages[0].data.length > 0}
		<ul>
			{#each $likeArticlesQuery.data.pages as { data }}
				{#each data as article (article.id)}
					<li>
						<ArticleList {article} />
					</li>
				{/each}
			{/each}
		</ul>

		<InfiniteScroll
			fetchFn={$likeArticlesQuery.fetchNextPage}
			hasNextPage={$likeArticlesQuery.hasNextPage}
		/>
	{:else}
		<p>좋아요한 아티클이 없습니다.</p>
	{/if}
{/if}
