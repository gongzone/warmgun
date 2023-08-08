<script lang="ts">
	import { page } from '$app/stores';
	import type { PageData } from './$types';

	import { goto } from '$app/navigation';
	import Sortor from '$components/@ui/Sortor.svelte';
	import { TabAnchor, TabGroup } from '@skeletonlabs/skeleton';
	import { communities } from '$lib/constants/communities';
	import Paginator from '$components/@ui/Paginator.svelte';
	import PostItem from '$components/@item/Post/PostItem.svelte';
	import NoWriting from '$components/@ui/NoWriting.svelte';
	import Seo from '$components/@utils/Seo.svelte';
	import PencilIcon from '$components/@icons/PencilIcon.svelte';

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

<Seo title="커뮤니티" />

<div class="container max-w-[800px] mx-auto py-16 md:py-20">
	<div class="space-y-6">
		<h3 class="text-5xl sm:text-7xl font-bold text-center">Community</h3>
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
			<a href="/community/write" class="btn-icon variant-ringed-tertiary sm:hidden">
				<PencilIcon class="w-5 h-5" /></a
			>
			<a href="/community/write" class="hidden variant-ringed-tertiary sm:btn">
				<span>게시글 작성</span>
				<span><PencilIcon class="w-5 h-5" /></span>
			</a>
		</div>
		<TabGroup justify="justify-start md:justify-center">
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

	{#if posts.length > 0}
		<ul>
			{#each posts as post (post.id)}
				<li>
					<PostItem displayCommunity={$page.url.pathname === '/community' ? true : false} {post} />
				</li>
			{/each}
		</ul>
	{:else}
		<div>
			<NoWriting />
		</div>
	{/if}

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
