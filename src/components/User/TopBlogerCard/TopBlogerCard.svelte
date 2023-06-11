<script lang="ts">
	import type { BlogUser } from '$lib/types/user';

	import UserAvatar from '$components/@ui/UserAvatar.svelte';
	import ArrowRightTwoIcon from '$components/@icons/ArrowRightTwoIcon.svelte';

	export let topBloger: BlogUser;

	$: ({ username, profile, _count } = topBloger);

	$: stats = [
		{ title: '구독자', count: _count.followedBy },
		{ title: '팔로잉', count: _count.following },
		{ title: '아티클', count: _count.articles }
	];
</script>

<div class="shadow-xl rounded-md overflow-hidden">
	<header class="grid grid-cols-3 gap-8 items-center p-4 bg-neutral-100 text-neutral-800">
		<UserAvatar src={profile?.avatar} width="w-full" rounded="rounded-lg" />
		<div class="col-span-2 space-y-2">
			<span class="opacity-50 line-clamp-1 sm:text-lg">{profile?.field}</span>
			<span class="font-semibold line-clamp-1 text-lg sm:text-2xl">{profile?.nickname}</span>
			<p class="font-light line-clamp-1 break-all sm:line-clamp-2">{profile?.bio}</p>
		</div>
	</header>

	<footer class="flex justify-between items-center p-8 sm:p-10 bg-white text-neutral-800">
		<div class="flex items-center gap-8">
			{#each stats as stats (stats.title)}
				<div class="flex flex-col">
					<span class="font-semibold text-xs sm:text-sm">{stats.title}</span>
					<span class="font-light text-sm">{stats.count}</span>
				</div>
			{/each}
		</div>

		<a
			href={`/@${username}`}
			class="btn-icon bg-surface-900 shadow-lg text-surface-50 border hover:bg-surface-50 hover:text-surface-900 hover:border-surface-300"
		>
			<ArrowRightTwoIcon />
		</a>
	</footer>
</div>
