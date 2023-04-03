<script lang="ts">
	import { createQuery } from '@tanstack/svelte-query';

	import { TRENDING_ARTICLE_PAGINATION_TAKE } from '$lib/constants/article';
	import { getBestArticles } from '$api/article';

	import ArticleCard from './@ArticleCard/ArticleCard.svelte';

	const bestArticlesQuery = createQuery({
		queryKey: ['bestArticles', TRENDING_ARTICLE_PAGINATION_TAKE],
		queryFn: () => getBestArticles(TRENDING_ARTICLE_PAGINATION_TAKE)
	});
</script>

{#if $bestArticlesQuery.isSuccess}
	<ul class="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
		{#each $bestArticlesQuery.data as article (article.id)}
			<li>
				<ArticleCard {article} />
			</li>
		{/each}
	</ul>
{/if}
