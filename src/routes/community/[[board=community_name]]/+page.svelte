<script lang="ts">
	import { page } from '$app/stores';
	import type { PageData } from './$types';

	import CommunitySortor from '$components/Community/CommunitySortor.svelte';
	import CommunityPaginator from '$components/Community/CommunityPaginator.svelte';
	import CommunityTab from '$components/Community/CommunityTab.svelte';
	import { goto } from '$app/navigation';
	import Sortor from '$components/@ui/Sortor.svelte';
	import { TabAnchor, TabGroup } from '@skeletonlabs/skeleton';
	import { communities } from '$lib/constants/communities';
	import Paginator from '$components/@ui/Paginator.svelte';
	import PostItem from '$components/@item/Post/PostItem.svelte';

	export let data: PageData;

	$: ({ posts, postsCount, cursor, sort } = data);

	$: settings = {
		offset: cursor ? cursor : 0,
		limit: 10,
		size: postsCount
	};

	const postSortings = { recent: '최신순', trending: '트렌딩' };

	function tabHref(path: string, sort: string | null) {
		if (sort) {
			return `${path}?sort=${sort}`;
		} else {
			return `${path}`;
		}
	}

	function onPageChange(e: CustomEvent): void {
		const sort = $page.url.searchParams.get('sort');

		if (e.detail === 0) {
			goto($page.url.pathname + `${sort ? `?sort=${sort}` : ''}`);
			return;
		}

		goto(`${$page.url.pathname}?cursor=${e.detail}` + `${sort ? `&sort=${sort}` : ''}`);
	}
</script>

<div class="container max-w-[800px] mx-auto py-16 md:py-20">
	<div class="space-y-6">
		<h3 class="text-7xl font-bold text-center">Community</h3>
		<div class="flex items-center justify-between">
			<Sortor
				initValue={sort ? postSortings[sort] : postSortings['recent']}
				items={postSortings}
				on:sort={(e) => {
					if (cursor) {
						goto(`?cursor=${cursor}&sort=${e.detail}`);
					} else {
						goto(`?sort=${e.detail}`);
					}
				}}
			/>
			<a href="/community/write" class="btn variant-ringed-tertiary">게시글 작성</a>
		</div>
		<TabGroup justify="justify-center">
			<TabAnchor href={tabHref('/community', sort)} selected={$page.url.pathname === `/community`}>
				<span>전체</span>
			</TabAnchor>
			{#each Object.values(communities) as { title, slug } (title)}
				<TabAnchor
					href={tabHref(`/community/${slug}`, sort)}
					selected={$page.url.pathname === `/community/${slug}`}
				>
					<span>{title}</span>
				</TabAnchor>
			{/each}
		</TabGroup>
	</div>

	<ul>
		{#each posts as post (post.id)}
			<li>
				<PostItem displayCommunity={$page.url.pathname === '/community' ? true : false} {post} />
			</li>
		{/each}
	</ul>

	<div class="my-12">
		<Paginator
			bind:settings
			showNumerals
			maxNumerals={1}
			justify="justify-center"
			on:page={onPageChange}
		/>
	</div>
</div>
