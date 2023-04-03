<script lang="ts">
	import { createQuery } from '@tanstack/svelte-query';
	import WitchIcon from '~icons/game-icons/witch-face';

	import { getTopBlogers } from '$api/user';
	import UserPiece from '$components/@ui/Block/UserPiece.svelte';

	const topBlogersQuery = createQuery({
		queryKey: ['topBlogers'],
		queryFn: () => getTopBlogers()
	});
</script>

<div class="flex items-center gap-2 bg-primary-600 px-6 py-4 rounded-lg">
	<span><WitchIcon class="text-surface-600 w-[40px] h-[40px]" /></span>
	<span class="text-2xl font-bold font-serif text-surface-600">Top Blogers</span>
</div>

{#if $topBlogersQuery.isSuccess}
	<ul>
		{#each $topBlogersQuery.data as topBloger (topBloger.id)}
			<li class="space-y-2 py-6 border-b border-b-surface-500 border-dashed">
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
