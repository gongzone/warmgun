<script lang="ts">
	import type { PageData } from './$types';
	import { page } from '$app/stores';
	import { browser } from '$app/environment';
	import { createInfiniteQuery } from '@tanstack/svelte-query';

	import type { BlogUser } from '$lib/types/user';
	import { search } from '$lib/client-fetch/search';

	import UserItem from '$components/User/UserItem/UserItem.svelte';
	import NoSearchResults from '../_NoSearchResults/NoSearchResults.svelte';
	import InfiniteScroll from '$components/@utils/InfiniteScroll.svelte';
	import SearchTotal from '../_SearchTotal/SearchTotal.svelte';

	export let data: PageData;

	$: ({ q } = data);

	$: searchUsersQuery = createInfiniteQuery({
		queryKey: ['search', 'users', q],
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

{#if $searchUsersQuery.isSuccess && $searchUsersQuery.data.pages[0].totalHits > 0}
	<SearchTotal totalHits={$searchUsersQuery.data.pages[0].totalHits} />
	<ul class="grid grid-cols-4 gap-7">
		{#each $searchUsersQuery.data.pages as { data }}
			{#each data as user (user.id)}
				<li><UserItem {user} /></li>
			{/each}
		{/each}
	</ul>
	<InfiniteScroll
		fetchFn={$searchUsersQuery.fetchNextPage}
		hasNextPage={$searchUsersQuery.hasNextPage}
	/>
{:else}
	<NoSearchResults />
{/if}
