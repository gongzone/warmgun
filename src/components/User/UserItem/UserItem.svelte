<script lang="ts">
	import type { BlogUser } from '$lib/types/user';

	import UserAvatar from '$components/@ui/UserAvatar.svelte';

	export let user: BlogUser;
</script>

<div class="flex items-center py-6 border-b border-b-surface-600 gap-8">
	<header class="flex items-center gap-3">
		<a href={`/@${user.username}`}>
			<UserAvatar src={user.profile?.avatar} width="w-20" />
		</a>
		<div class="space-y-1">
			<div class="flex items-center">
				<a href={`/@${user.username}`}>
					<span class="block font-semibold text-xl">{user.profile?.nickname}</span>
				</a>
			</div>
			<span class="badge variant-filled-primary">{user.profile?.field}</span>

			<div class="text-right">
				<span class="text-xs font-light">구독자 {user._count.followedBy}</span>
				<span class="text-xs font-light">/</span>
				<span class="text-xs font-light">아티클 {user._count.articles}</span>
			</div>
		</div>
	</header>

	<div class="bg-surface-600 p-4 rounded-lg max-w-[450px]">
		<p class="text-sm font-extralight line-clamp-3">{user.profile?.bio}</p>
	</div>
</div>
