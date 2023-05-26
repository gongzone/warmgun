<script lang="ts">
	import { page } from '$app/stores';
	import { createInfiniteQuery } from '@tanstack/svelte-query';

	import type { Article } from '$lib/types/article';
	import { search } from '$lib/client-fetch/search';
	import ArticleGrid from '$components/Article/ArticleGrid.svelte';
	import ArticleItem from '$components/Article/ArticleItem/ArticleItem.svelte';
	import InfiniteScroll from '$components/@utils/InfiniteScroll.svelte';
	import { browser } from '$app/environment';
	import type { BlogUser } from '$lib/types/user';

	$: q = $page.url.searchParams.get('q');

	$: searchUsersQuery = createInfiniteQuery({
		queryKey: ['search', 'articles', q],
		queryFn: () =>
			search<BlogUser[]>(q, {
				mode: 'users',
				take: 12,
				cursor: 0
			}),
		getNextPageParam: (lastPage) => lastPage.nextCursor,
		keepPreviousData: true,
		enabled: browser && !!q
	});

	$: console.log($searchUsersQuery.data);
</script>

{#if $searchUsersQuery.isSuccess && $searchUsersQuery.data.pages}
	<ul>
		{#each $searchUsersQuery.data.pages as { data }}
			{#each data as user (user.id)}
				<li>{user.profile?.nickname}</li>
			{/each}
		{/each}
	</ul>
	<InfiniteScroll
		fetchFn={$searchUsersQuery.fetchNextPage}
		hasNextPage={$searchUsersQuery.hasNextPage}
	/>
{/if}
