<script lang="ts">
	import { createInfiniteQuery, createQuery } from '@tanstack/svelte-query';
	import MedalIcon from '~icons/ri/medal-2-line';
	import FireIcon from '~icons/ri/fire-fill';

	import { TRENDING_ARTICLE_PAGINATION_TAKE } from '$lib/constants/article';
	import { getBestArticles, getHotArticles } from '$api/article';
	import ArticleCard from '$components/Article/ArticleCard/ArticleCard.svelte';
	import SectionTitle from '$components/Layout/Section/SectionTitle/SectionTitle.svelte';
	import SectionDivider from '$components/Layout/Section/SectionDivider/SectionDivider.svelte';
	import ArticleList from '$components/Article/ArticleList.svelte';
	import InfiniteScroll from '$components/@Base/InfiniteScroll/InfiniteScroll.svelte';

	const bestArticlesQuery = createQuery({
		queryKey: ['bestArticles', TRENDING_ARTICLE_PAGINATION_TAKE],
		queryFn: () => getBestArticles(TRENDING_ARTICLE_PAGINATION_TAKE)
	});

	const hotArticlesQuery = createInfiniteQuery({
		queryKey: ['trendingArticles', TRENDING_ARTICLE_PAGINATION_TAKE],
		queryFn: getHotArticles,
		getNextPageParam: (lastPage) => lastPage.nextCursor
	});

	$: bestArticles = $bestArticlesQuery.isSuccess ? $bestArticlesQuery.data : [];
	$: trendingArticlesPages = $hotArticlesQuery.isSuccess ? $hotArticlesQuery.data.pages : [];
</script>

<div class="px-[5vw] py-10 md:py-20">
	<SectionTitle title="Trending Articles" subTitle="요새 뜨는 글들을 만나보세요" />
	<SectionDivider text="Best of Best" icon={MedalIcon} />

	<ul class="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
		{#each bestArticles as article (article.id)}
			<li>
				<ArticleCard {article} />
			</li>
		{/each}
	</ul>

	<SectionDivider text="Hot Articles" icon={FireIcon} />

	{#if $hotArticlesQuery.isSuccess}
		<ul class="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
			{#each trendingArticlesPages as { articles }}
				{#each articles as article}
					<ArticleCard {article} />
				{/each}
			{/each}
		</ul>

		<InfiniteScroll
			fetchFn={$hotArticlesQuery.fetchNextPage}
			hasNextPage={$hotArticlesQuery.hasNextPage}
		/>
	{/if}
</div>
