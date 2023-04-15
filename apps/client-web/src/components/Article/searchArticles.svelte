<script lang="ts">
	import { page } from '$app/stores';
	import { createInfiniteQuery } from '@tanstack/svelte-query';

	import { searchAll } from '$api/search';

	import ArticleList from './@ArticleList/ArticleList.svelte';
	import InfiniteScroll from '$components/@utility/InfiniteScroll.svelte';

	const searchArticlesQuery = createInfiniteQuery({
		queryKey: ['search', $page.params['searchInput'], 'articles'],
		queryFn: searchAll,
		getNextPageParam: (lastPage) => lastPage.nextCursor
	});
</script>

{#if $searchArticlesQuery.isSuccess}
	{#if $searchArticlesQuery.data.pages[0].data.length > 0}
		<ul>
			{#each $searchArticlesQuery.data.pages as { data }}
				{#each data as article (article.id)}
					<li>
						<ArticleList {article} />
					</li>
				{/each}
			{/each}
		</ul>

		<InfiniteScroll
			fetchFn={$searchArticlesQuery.fetchNextPage}
			hasNextPage={$searchArticlesQuery.hasNextPage}
		/>
	{:else}
		<p>검색 결과가 존재하지 않습니다.</p>
	{/if}
{/if}
