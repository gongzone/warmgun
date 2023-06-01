<script lang="ts">
	import UserAvatar from '$components/@ui/UserAvatar.svelte';
	import type { BlogUser } from '$lib/types/user';

	export let user: BlogUser;
</script>

<div class="border-t border-t-surface-600 py-12">
	<div class="flex gap-4">
		<div>
			<UserAvatar src={user.profile?.avatar} width="w-24" />
		</div>
		<div class="w-full space-y-4">
			<div class="flex flex-col gap-1">
				<span class="text-sm font-bold opacity-75">{user.profile?.field}</span>
				<span class="text-xl font-bold">{user.profile?.nickname}</span>
				<div class="flex flex-wrap gap-2 mt-2">
					<span class="badge variant-filled">아티클 {user._count.articles}</span>
					<span class="badge variant-filled">구독자 {user._count.followedBy}</span>
				</div>
			</div>

			<div class="space-y-4">
				<p class="text-sm">{user.profile?.bio}</p>
			</div>
			<div class="flex justify-end">
				<button class="btn variant-ringed-tertiary text-sm">구독하기</button>
			</div>
		</div>
	</div>
</div>
