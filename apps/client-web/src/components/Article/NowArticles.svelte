<script lang="ts">
	import { createInfiniteQuery } from '@tanstack/svelte-query';

	import { findAllArticles } from '$api/article';

	import ArticleList from './@ArticleList/ArticleList.svelte';
	import InfiniteScroll from '$components/@utility/InfiniteScroll.svelte';

	const nowArticlesQuery = createInfiniteQuery({
		queryKey: ['nowArticles'],
		queryFn: findAllArticles,
		getNextPageParam: (lastPage) => lastPage.nextCursor
	});
</script>

{#if $nowArticlesQuery.isSuccess}
	<ul>
		{#each $nowArticlesQuery.data.pages as { data }}
			{#each data as article (article.id)}
				<li>
					<ArticleList {article} />
				</li>
			{/each}
		{/each}
	</ul>

	<InfiniteScroll
		fetchFn={$nowArticlesQuery.fetchNextPage}
		hasNextPage={$nowArticlesQuery.hasNextPage}
	/>
{/if}
