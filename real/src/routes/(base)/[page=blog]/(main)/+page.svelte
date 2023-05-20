<script lang="ts">
	import { page } from '$app/stores';
	import { createInfiniteQuery } from '@tanstack/svelte-query';

	import { findBlogArticles } from '$lib/client-fetch/article';

	import ArticleItem from '$lib/components/Article/ArticleItem/ArticleItem.svelte';
	import InfiniteScroll from '$lib/components/@utils/InfiniteScroll.svelte';

	const blogArticlesQuery = createInfiniteQuery({
		queryKey: ['articles', $page.params.page.slice(1)],
		queryFn: findBlogArticles,
		getNextPageParam: (lastPage) => lastPage.nextCursor
	});
</script>

{#if $blogArticlesQuery.isSuccess}
	<ul class="grid list-none grid-cols-1 gap-9 sm:grid-cols-2 lg:grid-cols-3">
		{#each $blogArticlesQuery.data.pages as { data }}
			{#each data as article (article.id)}
				<li>
					<ArticleItem {article} />
				</li>
			{/each}
		{/each}
	</ul>

	<InfiniteScroll
		fetchFn={$blogArticlesQuery.fetchNextPage}
		hasNextPage={$blogArticlesQuery.hasNextPage}
	/>
{/if}
