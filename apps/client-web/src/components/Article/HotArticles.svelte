<script lang="ts">
	import { createInfiniteQuery } from '@tanstack/svelte-query';

	import { findHotArticles } from '$api/article';

	import ArticleList from './@ArticleList/ArticleList.svelte';
	import InfiniteScroll from '$components/@utility/InfiniteScroll.svelte';

	const hotArticlesQuery = createInfiniteQuery({
		queryKey: ['hotArticles'],
		queryFn: findHotArticles,
		getNextPageParam: (lastPage) => lastPage.nextCursor
	});
</script>

{#if $hotArticlesQuery.isSuccess}
	<ul>
		{#each $hotArticlesQuery.data.pages as { data }}
			{#each data as article (article.id)}
				<li>
					<ArticleList {article} />
				</li>
			{/each}
		{/each}
	</ul>

	<InfiniteScroll
		fetchFn={$hotArticlesQuery.fetchNextPage}
		hasNextPage={$hotArticlesQuery.hasNextPage}
	/>
{/if}
