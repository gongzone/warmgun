<script lang="ts">
	import { createInfiniteQuery } from '@tanstack/svelte-query';

	import { findMyFollowingUsers } from '$api/user';

	import InfiniteScroll from '$components/@utility/InfiniteScroll.svelte';
	import UserPiece from '$components/@ui/Block/UserPiece.svelte';

	const followingUsersQuery = createInfiniteQuery({
		queryKey: ['followingUsers'],
		queryFn: findMyFollowingUsers,
		getNextPageParam: (lastPage) => lastPage.nextCursor
	});
</script>

{#if $followingUsersQuery.isSuccess}
	{#if $followingUsersQuery.data.pages[0].data.length > 0}
		<ul>
			{#each $followingUsersQuery.data.pages as { data }}
				{#each data as user (user.id)}
					<li>
						<UserPiece
							username={user.username}
							nickname={user.profile.nickname}
							avatar={user.profile.avatar}
							subText={user.profile.bio}
						/>
					</li>
				{/each}
			{/each}
		</ul>

		<InfiniteScroll
			fetchFn={$followingUsersQuery.fetchNextPage}
			hasNextPage={$followingUsersQuery.hasNextPage}
		/>
	{:else}
		<p>구독중인 블로거가 존재하지 않습니다.</p>
	{/if}
{/if}
