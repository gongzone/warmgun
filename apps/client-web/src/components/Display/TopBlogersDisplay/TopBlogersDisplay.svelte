<script lang="ts">
	import { createQuery } from '@tanstack/svelte-query';
	import WitchIcon from '~icons/game-icons/witch-face';

	import { findTopUsers } from '$api/user';
	import UserPiece from '$components/@ui/Block/UserPiece.svelte';

	const topUsersQuery = createQuery({
		queryKey: ['topUsers'],
		queryFn: findTopUsers
	});
</script>

<div>
	<div class="flex items-center gap-2 pb-4 bg-secondary-900 px-6 py-4 rounded-t-xl">
		<span><WitchIcon class="w-[40px] h-[40px]" /></span>
		<span class="text-2xl font-bold">Top Blogers</span>
	</div>

	{#if $topUsersQuery.isSuccess}
		<ul class="">
			{#each $topUsersQuery.data as topBloger (topBloger.id)}
				<li class="space-y-4 py-6 border-b border-b-surface-400 border-dashed">
					<UserPiece
						username={topBloger.username}
						nickname={topBloger.profile.nickname}
						avatar={topBloger.profile.avatar}
						subText={topBloger.profile.bio}
					/>

					<div class="space-x-2 ml-14">
						<span class="badge variant-filled-success">구독자 {topBloger._count.followedBy}</span>
						<span class="badge variant-filled">아티클 {topBloger._count.articles}</span>
					</div>
				</li>
			{/each}
		</ul>
	{/if}
</div>
