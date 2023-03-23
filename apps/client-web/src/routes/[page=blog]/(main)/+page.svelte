<script lang="ts">
	import { getArticlesByPagination } from '$api/article';
	import { page } from '$app/stores';
	import { createInfiniteQuery } from '@tanstack/svelte-query';

	import ArticleList from '$components/Article/ArticleList.svelte';

	// Todo: infinite scroll

	const query = createInfiniteQuery({
		queryKey: ['articles', $page.params.page.slice(1)],
		queryFn: getArticlesByPagination,
		getNextPageParam: (lastPage) => lastPage.lastCursor
	});
</script>

{#if $query.isSuccess}
	{#each $query.data.pages as group, index (index)}
		{#each group.articles as article (article.id)}
			<ArticleList {article} />
		{/each}
	{/each}
{:else if $query.isLoading}
	<p>Loading...</p>
{/if}
