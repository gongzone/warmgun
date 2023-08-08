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
	import ArticleItem from '$components/@item/Article/ArticleItem.svelte';
	import PostItem from '$components/@item/Post/PostItem.svelte';
	import NoWriting from '$components/@ui/NoWriting.svelte';

	export let data: PageData;

	$: postsQuery = createInfiniteQuery({
		queryKey: ['posts', $page.params.page.slice(1), 'recent', 10],
		queryFn: api().findPostsByUsername,
		getNextPageParam: (lastPage) => lastPage.nextCursor
	});
</script>

{#if $postsQuery.isSuccess && $postsQuery.data.pages[0].data.length > 0}
	<ul class="flex flex-col">
		{#each $postsQuery.data.pages as { data }, i (i)}
			{#each data as post (post.id)}
				<li>
					<PostItem displayUserInfo={false} displayCommunity={true} {post} py="py-6" />
				</li>
			{/each}
		{/each}
	</ul>

	<InfiniteScroll fetchFn={$postsQuery.fetchNextPage} hasNextPage={$postsQuery.hasNextPage} />
{:else}
	<div class="my-4">
		<NoWriting />
	</div>
{/if}
