<script lang="ts">
	import { page } from '$app/stores';
	import { createInfiniteQuery } from '@tanstack/svelte-query';

	import { findArticles } from '$lib/client-fetch/article';

	import ArticleItem from '$components/Article/ArticleItem/ArticleItem.svelte';
	import InfiniteScroll from '$components/@utils/InfiniteScroll.svelte';

	$: recentArticleQuery = createInfiniteQuery({
		queryKey: ['articles', 'recent', $page.url.searchParams.get('genre')?.toUpperCase() ?? 'ALL'],
		queryFn: findArticles,
		getNextPageParam: (lastPage) => lastPage.nextCursor
	});
</script>

{#if $recentArticleQuery.isSuccess && $recentArticleQuery.data.pages[0].data.length > 0}
	<ul class="grid list-none grid-cols-1 gap-9 sm:grid-cols-2 lg:grid-cols-3">
		{#each $recentArticleQuery.data.pages as { data }}
			{#each data as article (article.id)}
				<li>
					<ArticleItem {article} />
				</li>
			{/each}
		{/each}
	</ul>

	<InfiniteScroll
		fetchFn={$recentArticleQuery.fetchNextPage}
		hasNextPage={$recentArticleQuery.hasNextPage}
	/>
{:else}
	<div>
		<span>작성된 글이 없습니다.</span>
	</div>
{/if}
