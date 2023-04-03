<script lang="ts">
	import { createInfiniteQuery } from '@tanstack/svelte-query';

	import { TRENDING_ARTICLE_PAGINATION_TAKE } from '$lib/constants/article';
	import { getHotArticles } from '$api/article';

	import ArticleList from './@ArticleList/ArticleList.svelte';
	import InfiniteScroll from '$components/@Base/InfiniteScroll/InfiniteScroll.svelte';

	const hotArticlesQuery = createInfiniteQuery({
		queryKey: ['trendingArticles', TRENDING_ARTICLE_PAGINATION_TAKE],
		queryFn: getHotArticles,
		getNextPageParam: (lastPage) => lastPage.nextCursor
	});
</script>

{#if $hotArticlesQuery.isSuccess}
	<ul>
		{#each $hotArticlesQuery.data.pages as { articles }}
			{#each articles as article}
				<li>
					<ArticleList {article} />
				</li>

				<hr class="my-6" />
			{/each}
		{/each}
	</ul>

	<InfiniteScroll
		fetchFn={$hotArticlesQuery.fetchNextPage}
		hasNextPage={$hotArticlesQuery.hasNextPage}
	/>
{/if}
