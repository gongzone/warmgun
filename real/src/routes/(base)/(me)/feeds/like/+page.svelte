<script lang="ts">
	import { createInfiniteQuery } from '@tanstack/svelte-query';

	import ArticleItem from '$components/Article/ArticleItem/ArticleItem.svelte';
	import InfiniteScroll from '$components/@utils/InfiniteScroll.svelte';
	import { findFeedArticles, findLikeArticles } from '$lib/client-fetch/article';

	$: likeArticleQuery = createInfiniteQuery({
		queryKey: ['articles', 'like'],
		queryFn: findLikeArticles,
		getNextPageParam: (lastPage) => lastPage.nextCursor,
		keepPreviousData: true
	});
</script>

{#if $likeArticleQuery.isSuccess && $likeArticleQuery.data.pages[0].data.length > 0}
	<div>
		<ul class="article-grid">
			{#each $likeArticleQuery.data.pages as { data }}
				{#each data as article (article.id)}
					<li><ArticleItem {article} /></li>
				{/each}
			{/each}
			<InfiniteScroll
				fetchFn={$likeArticleQuery.fetchNextPage}
				hasNextPage={$likeArticleQuery.hasNextPage}
			/>
		</ul>
	</div>
{:else}
	<p class="text-center">관심있는 글에 좋아요를 눌러보세요.</p>
{/if}
