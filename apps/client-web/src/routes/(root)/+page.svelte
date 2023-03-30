<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import { browser } from '$app/environment';
	import { createInfiniteQuery } from '@tanstack/svelte-query';
	import MedalIcon from '~icons/ri/medal-2-line';
	import FireIcon from '~icons/ri/fire-fill';

	import { TRENDING_ARTICLE_PAGINATION_TAKE } from '$lib/constants/article';
	import { getTrendingArticles } from '$api/article';
	import ArticleCard from '$components/Article/ArticleCard/ArticleCard.svelte';
	import SectionTitle from '$components/Layout/Section/SectionTitle/SectionTitle.svelte';
	import SectionDivider from '$components/Layout/Section/SectionDivider/SectionDivider.svelte';
	import ArticleList from '$components/Article/ArticleList.svelte';
	import { setInfiniteScroll } from '$lib/utils/Infinite-scroll';

	const getTrendingArticlesQuery = createInfiniteQuery({
		queryKey: ['trendingArticles', TRENDING_ARTICLE_PAGINATION_TAKE],
		queryFn: getTrendingArticles,
		getNextPageParam: (lastPage) => {
			console.log(lastPage.nextCursor);
			return lastPage.nextCursor;
		}
	});

	let bottom: Element;

	onMount(() => {
		if (browser) {
			setInfiniteScroll(bottom, {
				fetchFn: $getTrendingArticlesQuery.fetchNextPage,
				isMoreAvailable: $getTrendingArticlesQuery.hasNextPage
			});
		}
	});
</script>

<div class="px-[5vw] py-10 md:py-20">
	<SectionTitle title="Trending Articles" subTitle="요새 뜨는 글들을 만나보세요" />
	<SectionDivider text="Best of Best" icon={MedalIcon} />

	{#if $getTrendingArticlesQuery && $getTrendingArticlesQuery.isSuccess}
		<ul class="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
			<!-- {#each $getTrendingArticlesQuery.data.pages[0].articles as article (article.id)}
				<ArticleCard {article} />
			{/each} -->

			{#each $getTrendingArticlesQuery.data.pages as { articles }}
				{#each articles as article}
					<ArticleCard {article} />
				{/each}
			{/each}
		</ul>

		<!-- <SectionDivider text="Hot Articles" icon={FireIcon} />

		<ul>
			{#each $getTrendingArticlesQuery.data.pages.splice(1) as group, index (index)}
				{#each group.articles as article (article.id)}
					<ArticleList {article} />
				{/each}
			{/each}
		</ul> -->

		<!-- <div>
			<button
				on:click={() => $getTrendingArticlesQuery.fetchNextPage()}
				disabled={!$getTrendingArticlesQuery.hasNextPage ||
					$getTrendingArticlesQuery.isFetchingNextPage}
			>
				{#if $getTrendingArticlesQuery.isFetching}
					Loading more...
				{:else if $getTrendingArticlesQuery.hasNextPage}
					Load More
				{:else}
					Nothing more to load
				{/if}
			</button>
		</div> -->
	{/if}

	<div bind:this={bottom} />
</div>
