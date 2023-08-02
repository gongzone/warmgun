<script lang="ts">
	import { page } from '$app/stores';
	import ArticleCard from '$components/@item/Article/ArticleCard.svelte';
	import { TabAnchor, TabGroup } from '@skeletonlabs/skeleton';
	import { categories } from '$lib/constants/categories';
	import Sortor from '$components/@ui/Sortor.svelte';
	import type { PageData } from './$types';
	import InfiniteScroll from '$components/@utils/InfiniteScroll.svelte';
	import { createInfiniteQuery } from '@tanstack/svelte-query';
	import { api } from '$lib/api/api';
	import { goto } from '$app/navigation';

	export let data: PageData;

	$: ({ category, sort } = data);
	$: fullPath = $page.url.pathname + $page.url.search;

	$: articlesQuery = createInfiniteQuery({
		queryKey: ['articles', category, sort, 12],
		queryFn: api().findArticles,
		getNextPageParam: (lastPage) => lastPage.nextCursor
	});

	const articleSortings = { recent: '최신순', trending: '트렌딩', best: '베스트' };

	function tabHref(path: string, sort: string | null) {
		if (sort) {
			return `${path}?sort=${sort}`;
		}
		return `${path}`;
	}

	$: console.log($articlesQuery.hasNextPage, sort, category);
</script>

<div class="container max-w-[1024px] py-16 md:py-20">
	<div class="space-y-6">
		<h3 class="text-7xl font-bold text-center">Article</h3>
		<div class="flex items-center justify-between">
			<Sortor
				initValue={sort ? articleSortings[sort] : articleSortings['recent']}
				items={articleSortings}
				on:sort={(e) => {
					goto(`?sort=${e.detail}`);
				}}
			/>
			<div class="hidden items-center gap-4 sm:flex">
				<a href="/community/write" class="btn variant-filled-secondary">마이 피드</a>
				<a href="/community/write" class="btn variant-filled-primary">아티클 작성</a>
			</div>
		</div>

		<TabGroup justify="justify-center">
			<TabAnchor href={tabHref('/article', sort)} selected={fullPath === tabHref('/article', sort)}>
				<span>전체</span>
			</TabAnchor>
			{#each Object.values(categories) as { title, slug } (title)}
				<TabAnchor
					href={tabHref(`/article/${slug}`, sort)}
					selected={fullPath === tabHref(`/article/${slug}`, sort)}
				>
					<span>{title}</span>
				</TabAnchor>
			{/each}
		</TabGroup>
	</div>

	<div class="my-7" />

	{#if $articlesQuery.isSuccess && $articlesQuery.data.pages[0].data.length > 0}
		<ul class="grid grid-cols-3 gap-8">
			{#each $articlesQuery.data.pages as { data }, i (i)}
				{#each data as article (article.id)}
					<li>
						<ArticleCard {article} />
					</li>
				{/each}
			{/each}
		</ul>

		<InfiniteScroll
			fetchFn={$articlesQuery.fetchNextPage}
			hasNextPage={$articlesQuery.hasNextPage}
		/>
	{/if}
</div>
