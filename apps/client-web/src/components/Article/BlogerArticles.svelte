<script lang="ts">
	import { page } from '$app/stores';
	import { createInfiniteQuery } from '@tanstack/svelte-query';

	import { findUserArticles } from '$api/article';

	import ArticleList from './@ArticleList/ArticleList.svelte';
	import InfiniteScroll from '$components/@utility/InfiniteScroll.svelte';

	const blogerArticlesQuery = createInfiniteQuery({
		queryKey: ['articles', $page.params.page.slice(1)],
		queryFn: findUserArticles,
		getNextPageParam: (lastPage) => lastPage.nextCursor
	});
</script>

{#if $blogerArticlesQuery.isSuccess}
	<ul>
		{#each $blogerArticlesQuery.data.pages as { data }}
			{#each data as article (article.id)}
				<li>
					<ArticleList {article} />
				</li>
			{/each}
		{/each}
	</ul>

	<InfiniteScroll
		fetchFn={$blogerArticlesQuery.fetchNextPage}
		hasNextPage={$blogerArticlesQuery.hasNextPage}
	/>
{/if}
