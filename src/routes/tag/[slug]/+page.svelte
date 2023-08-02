<script lang="ts">
	import type { PageData } from './$types';
	import { page } from '$app/stores';
	import { createInfiniteQuery } from '@tanstack/svelte-query';

	import { api } from '$lib/api/api';

	import ArticleItem from '$components/Article/ArticleItem/ArticleItem.svelte';
	import InfiniteScroll from '$components/@utils/InfiniteScroll.svelte';
	import NoDataCard from '$components/@ui/NoDataCard.svelte';
	import TextWithIcon from '$components/@ui/TextWithIcon.svelte';
	import { formatCount } from '$lib/utils/format';
	import FollowingIcon from '$components/@icons/FollowingIcon.svelte';
	import ArticleIcon from '$components/@icons/ArticleIcon.svelte';
	import Sortor from '$components/@ui/Sortor.svelte';
	import { goto } from '$app/navigation';
	import type { FindArticlesSort } from '$lib/server/db/article';
	import Separator from '$components/@ui/Separator.svelte';
	import ArticleCard from '$components/@item/Article/ArticleCard.svelte';

	export let data: PageData;

	$: ({ tag, isLiked } = data);

	const articleSortings = { recent: '최신순', trending: '트렌딩', best: '베스트' };

	$: tagSlug = $page.params.slug;
	$: sort = ($page.url.searchParams.get('sort') ?? 'recent') as FindArticlesSort;

	// $: ({ tag } = data);

	// $: articlesByTagQuery = createInfiniteQuery({
	// 	queryKey: ['articles', 'tags', tag.id, $page.params.filter, 12],
	// 	queryFn: api().findArticles,
	// 	getNextPageParam: (lastPage) => lastPage.nextCursor,
	// 	keepPreviousData: true
	// });

	$: articlesQuery = createInfiniteQuery({
		queryKey: ['articles', tagSlug, sort, 12],
		queryFn: api().findArticlesByTagSlug,
		getNextPageParam: (lastPage) => lastPage.nextCursor
	});
</script>

<!-- {#if $articlesByTagQuery.isSuccess && $articlesByTagQuery.data.pages[0].data.length > 0}
	<ul class="article-grid">
		{#each $articlesByTagQuery.data.pages as { data }}
			{#each data as article (article.id)}
				<li><ArticleItem {article} /></li>
			{/each}
		{/each}
	</ul>
	<InfiniteScroll
		fetchFn={$articlesByTagQuery.fetchNextPage}
		hasNextPage={$articlesByTagQuery.hasNextPage}
	/>
{:else}
	<NoDataCard text="아티클이 존재하지 않습니다!" />
{/if} -->
<div class="container max-w-[1024px] mx-auto py-16 md:py-20">
	<div class="space-y-6">
		<div class="space-y-4">
			<h3 class="text-5xl font-bold text-center"># {tag.name}</h3>
			<div class="flex justify-center gap-2">
				<TextWithIcon icon={FollowingIcon}>{formatCount(tag._count.tagLikes)} 구독자</TextWithIcon>
				<span>·</span>
				<TextWithIcon icon={ArticleIcon}>{formatCount(tag._count.articles)} 아티클</TextWithIcon>
			</div>
		</div>

		<div class="flex items-center justify-between">
			<Sortor
				initValue={sort ? articleSortings[sort] : articleSortings['recent']}
				items={articleSortings}
				on:sort={(e) => {
					goto(`?sort=${e.detail}`);
				}}
			/>
			<button class="btn variant-filled-primary">구독하기</button>
		</div>

		<Separator class="my-2" width="sm" />
	</div>

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
