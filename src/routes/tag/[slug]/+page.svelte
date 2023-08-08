<script lang="ts">
	import type { PageData } from './$types';
	import { page } from '$app/stores';
	import { createInfiniteQuery } from '@tanstack/svelte-query';

	import { api } from '$lib/api/api';

	import InfiniteScroll from '$components/@utils/InfiniteScroll.svelte';
	import TextWithIcon from '$components/@ui/TextWithIcon.svelte';
	import { formatCount } from '$lib/utils/format';
	import FollowingIcon from '$components/@icons/FollowingIcon.svelte';
	import ArticleIcon from '$components/@icons/ArticleIcon.svelte';
	import Sortor from '$components/@ui/Sortor.svelte';
	import { goto } from '$app/navigation';
	import type { FindArticlesSort } from '$lib/server/db/article';
	import Separator from '$components/@ui/Separator.svelte';
	import ArticleCard from '$components/@item/Article/ArticleCard.svelte';
	import NoWriting from '$components/@ui/NoWriting.svelte';
	import Seo from '$components/@utils/Seo.svelte';
	import { enhance } from '$app/forms';

	export let data: PageData;

	$: ({ tag, isFollowing } = data);

	const articleSortings = { recent: '최신순', trending: '트렌딩', best: '베스트' };

	$: tagSlug = $page.params.slug;
	$: sort = ($page.url.searchParams.get('sort') ?? 'recent') as FindArticlesSort;

	$: articlesQuery = createInfiniteQuery({
		queryKey: ['articles', tagSlug, sort, 12],
		queryFn: api().findArticlesByTagSlug,
		getNextPageParam: (lastPage) => lastPage.nextCursor
	});
</script>

<Seo title="태그 - {tag.name}" />

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
			<form method="POST" action={!isFollowing ? '?/followTag' : '?/unFollowTag'} use:enhance>
				<button type="submit" class="btn btn-sm variant-ringed-tertiary sm:btn"
					>{!isFollowing ? '구독하기' : '구독취소'}</button
				>
				<input type="hidden" name="tagId" value={tag.id} />
			</form>
		</div>

		<Separator class="my-2" width="sm" />
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
		<div class="mt-8">
			<NoWriting />
		</div>
	{/if}
</div>
