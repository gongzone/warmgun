<script lang="ts">
	import { enhance } from '$app/forms';

	import type { BlogUser } from '$lib/types/user';

	import UserAvatar from '$components/@ui/UserAvatar.svelte';

	export let user: BlogUser;
	export let isFollowing: boolean;
	export let isOwner: boolean;

	$: followAction = !isFollowing ? '?/follow' : '?/unFollow';
</script>

<div class="border-t border-b border-t-surface-600 border-b-surface-600 py-12">
	<div class="flex gap-4">
		<a href="/@{user.username}">
			<UserAvatar src={user.profile?.avatar} width="w-24" />
		</a>
		<div class="w-full space-y-4">
			<div class="flex flex-col gap-1">
				<span class="text-sm font-bold opacity-75">{user.profile?.field}</span>
				<a href="/@{user.username}">
					<span class="text-xl font-bold">{user.profile?.nickname}</span>
				</a>
				<div class="flex flex-wrap gap-2 mt-2">
					<span class="badge variant-filled">아티클 {user._count.articles}</span>
					<span class="badge variant-filled">구독자 {user._count.followedBy}</span>
				</div>
			</div>

			<div class="space-y-4">
				<p class="text-sm">{user.profile?.bio}</p>
			</div>

			{#if !isOwner}
				<form method="POST" action={followAction} class="flex justify-end" use:enhance>
					<input type="hidden" name="blogUserId" value={user.id} />
					<button type="submit" class="btn variant-ringed-tertiary text-sm">
						{!isFollowing ? '구독하기' : '구독 중'}
					</button>
				</form>
			{/if}
		</div>
	</div>
</div>
