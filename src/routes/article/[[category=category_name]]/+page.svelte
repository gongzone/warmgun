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
	import NoWriting from '$components/@ui/NoWriting.svelte';
	import Seo from '$components/@utils/Seo.svelte';
	import PencilIcon from '$components/@icons/PencilIcon.svelte';
	import FeedIcon from '$components/@icons/common/FeedIcon.svelte';

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
</script>

<Seo title="아티클" />

<div class="container max-w-[1024px] mx-auto py-16 md:py-20">
	<div class="space-y-6">
		<h3 class="text-5xl sm:text-7xl font-bold text-center">Article</h3>
		<div class="flex items-center justify-between">
			<Sortor
				initValue={sort ? articleSortings[sort] : articleSortings['recent']}
				items={articleSortings}
				on:sort={(e) => {
					goto(`?sort=${e.detail}`);
				}}
			/>
			<div class="flex items-center gap-2 sm:gap-4">
				<a href="/feed" class="btn-icon variant-ringed-tertiary sm:hidden">
					<FeedIcon class="w-5 h-5" />
				</a>
				<a href="/feed" class="hidden variant-ringed-tertiary sm:btn">
					<span>나의 피드</span>
					<span><FeedIcon class="w-5 h-5" /></span>
				</a>

				<a href="/write" class="btn-icon variant-ringed-tertiary sm:hidden">
					<PencilIcon class="w-5 h-5" />
				</a>
				<a href="/write" class="hidden variant-ringed-tertiary sm:btn">
					<span>아티클 작성</span>
					<span><PencilIcon class="w-5 h-5" /></span>
				</a>
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

	{#if $articlesQuery.isSuccess && $articlesQuery.data.pages[0].data.length > 0}
		<ul class="grid gap-7 min-[550px]:grid-cols-2 md:grid-cols-3 mt-8">
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
	{:else}
		<NoWriting />
	{/if}
</div>
