<script lang="ts">
	import type { PageData } from './$types';
	import { createInfiniteQuery } from '@tanstack/svelte-query';

	import type { BlogUser } from '$lib/types/user';
	import { api } from '$lib/api/api';

	import UserItem from '$components/User/UserItem/UserItem.svelte';
	import NoSearchResults from '../_NoSearchResults/NoSearchResults.svelte';
	import InfiniteScroll from '$components/@utils/InfiniteScroll.svelte';

	export let data: PageData;

	$: ({ q } = data);

	$: searchUsersQuery = createInfiniteQuery({
		queryKey: ['search', 'users', q, 12],
		queryFn: api().search<BlogUser>,
		getNextPageParam: (lastPage) => lastPage.nextCursor,
		enabled: !!q
	});
</script>

{#if $searchUsersQuery.isSuccess && $searchUsersQuery.data.pages[0].data.length > 0}
	<ul class="flex flex-col">
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
