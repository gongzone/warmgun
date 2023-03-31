<script lang="ts">
	import { createInfiniteQuery, createQuery } from '@tanstack/svelte-query';
	import MedalIcon from '~icons/ri/medal-2-line';
	import FireIcon from '~icons/ri/fire-fill';

	import { TRENDING_ARTICLE_PAGINATION_TAKE } from '$lib/constants/article';
	import { getBestArticles, getHotArticles } from '$api/article';
	import SectionTitle from '$components/Layout/Section/SectionTitle/SectionTitle.svelte';
	import SectionDivider from '$components/Layout/Section/SectionDivider/SectionDivider.svelte';
	import ArticleCard from '$components/Article/ArticleCard/ArticleCard.svelte';
	import ArticleList from '$components/Article/ArticleList/ArticleList.svelte';
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
</script>

<div class="px-[5vw] py-10 md:py-20">
	<SectionTitle title="Trending Articles" subTitle="요새 뜨는 글들을 만나보세요" />
	<SectionDivider text="Best of Best" icon={MedalIcon} />

	{#if $bestArticlesQuery.isSuccess}
		<ul class="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
			{#each $bestArticlesQuery.data as article (article.id)}
				<li>
					<ArticleCard {article} />
				</li>
			{/each}
		</ul>
	{/if}

	<SectionDivider text="Hot Articles" icon={FireIcon} />

	{#if $hotArticlesQuery.isSuccess}
		<div class="grid grid-cols-[repeat(8,1fr)_repeat(4,_minmax(48px,_1fr))]">
			<section class="col-[1_/_span_7]">
				<ul>
					{#each $hotArticlesQuery.data.pages as { articles }}
						{#each articles as article}
							<li>
								<ArticleList {article} />
							</li>

							<hr class="my-6" />
						{/each}
					{/each}
				</ul>
			</section>

			<aside class="col-[9_/_span_4]">
				<span class="text-2xl">Top Writers</span>

				<div class="card">s</div>
			</aside>
		</div>

		<InfiniteScroll
			fetchFn={$hotArticlesQuery.fetchNextPage}
			hasNextPage={$hotArticlesQuery.hasNextPage}
		/>
	{/if}
</div>
