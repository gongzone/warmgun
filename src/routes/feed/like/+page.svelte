<script lang="ts">
	import { createInfiniteQuery } from '@tanstack/svelte-query';

	import { api } from '$lib/api/api';

	import ArticleItem from '$components/@item/Article/ArticleItem.svelte';
	import InfiniteScroll from '$components/@utils/InfiniteScroll.svelte';

	$: likeArticleQuery = createInfiniteQuery({
		queryKey: ['articles', 'feed', 'like', 10],
		queryFn: api().findLikeArticles,
		getNextPageParam: (lastPage) => lastPage.nextCursor
	});
</script>

{#if $likeArticleQuery.isSuccess && $likeArticleQuery.data.pages[0].data.length > 0}
	<div>
		<ul class="flex flex-col">
			{#each $likeArticleQuery.data.pages as { data }}
				{#each data as article (article.id)}
					<li><ArticleItem {article} /></li>
				{/each}
			{/each}
		</ul>
		<InfiniteScroll
			fetchFn={$likeArticleQuery.fetchNextPage}
			hasNextPage={$likeArticleQuery.hasNextPage}
		/>
	</div>
{:else}
	<p class="text-center mt-8">관심있는 글에 좋아요를 눌러보세요.</p>
{/if}
