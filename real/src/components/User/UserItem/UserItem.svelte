<script lang="ts">
	import type { BlogUser } from '$lib/types/user';

	import UserAvatar from '$components/@ui/UserAvatar.svelte';

	export let user: BlogUser;
</script>

<div class="card p-5 space-y-3">
	<header class="flex flex-col items-center justify-center gap-2">
		<a href={`/@${user.username}`}>
			<UserAvatar src={user.profile?.avatar} width="w-20" />
		</a>
		<div class="text-center space-y-1">
			<a href={`/@${user.username}`}>
				<span class="block font-bold">{user.profile?.nickname}</span>
			</a>
			<span class="badge variant-filled-primary">{user.profile?.field}</span>
		</div>
	</header>

	<div class="text-center bg-surface-600 p-4 rounded-lg">
		<p class="text-sm font-extralight line-clamp-3">{user.profile?.bio}</p>
	</div>

	<div class="text-right">
		<span class="text-xs font-extralight">구독자 {user._count.followedBy}</span>
		<span class="text-xs font-extralight">/</span>
		<span class="text-xs font-extralight">아티클 {user._count.articles}</span>
	</div>
</div>
