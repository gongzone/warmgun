<script lang="ts">
	import { createInfiniteQuery } from '@tanstack/svelte-query';

	import UserItem from '$components/User/UserItem/UserItem.svelte';
	import InfiniteScroll from '$components/@utils/InfiniteScroll.svelte';
	import { findFollowingUsers } from '$lib/client-fetch/users';

	$: findFollowingUsersQuery = createInfiniteQuery({
		queryKey: ['users', 'following'],
		queryFn: findFollowingUsers,
		getNextPageParam: (lastPage) => lastPage.nextCursor,
		keepPreviousData: true
	});
</script>

{#if $findFollowingUsersQuery.isSuccess && $findFollowingUsersQuery.data.pages[0].data.length > 0}
	<ul class="user-grid">
		{#each $findFollowingUsersQuery.data.pages as { data }}
			{#each data as user (user.id)}
				<li><UserItem {user} /></li>
			{/each}
		{/each}
	</ul>
	<InfiniteScroll
		fetchFn={$findFollowingUsersQuery.fetchNextPage}
		hasNextPage={$findFollowingUsersQuery.hasNextPage}
	/>
{:else}
	<p class="text-center">구독중인 블로거가 없습니다.</p>
{/if}
