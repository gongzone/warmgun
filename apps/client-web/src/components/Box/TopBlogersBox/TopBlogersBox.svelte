<script lang="ts">
	import { createQuery } from '@tanstack/svelte-query';
	import WitchIcon from '~icons/game-icons/witch-face';

	import { getTopBlogers } from '$api/user';
	import UserAvatar from '$components/@Base/Avatar/UserAvatar.svelte';

	const topBlogersQuery = createQuery({
		queryKey: ['topBlogers', 10],
		queryFn: () => getTopBlogers(10)
	});
</script>

<div class="flex items-center gap-2 bg-primary-600 px-6 py-4 rounded-lg">
	<span><WitchIcon class="text-surface-600 w-[40px] h-[40px]" /></span>
	<span class="text-2xl font-bold font-serif text-surface-600">Top Blogers</span>
</div>

{#if $topBlogersQuery.isSuccess}
	<ul>
		{#each $topBlogersQuery.data as topBloger (topBloger.id)}
			<li class="space-y-2 py-6 px-6 border-b border-b-surface-500 border-dashed">
				<div class="flex items-center gap-2">
					<span>
						<UserAvatar avatar={topBloger.avatar} />
					</span>
					<div class="flex flex-col">
						<span class="font-bold">
							{topBloger.nickname}
						</span>
						<span class="text-sm text-surface-300 line-clamp-3">{topBloger.bio} </span>
					</div>
				</div>

				<div class="space-x-2 ml-14">
					<span class="badge variant-filled-success">구독자 {topBloger.followedByCount}</span>
					<span class="badge variant-filled">아티클 {topBloger.articleCount}</span>
				</div>
			</li>
		{/each}
	</ul>
{/if}
