<script lang="ts">
	import type { BlogUser } from '$lib/types/user';

	import UserAvatar from '$components/@ui/UserAvatar.svelte';

	export let user: BlogUser;
</script>

<div class="flex items-center py-6 border-b border-b-surface-600 gap-4 sm:gap-8">
	<header class="flex items-center gap-3">
		<a href={`/@${user.username}`}>
			<UserAvatar src={user.profile?.avatar} width="w-12 sm:w-20" />
		</a>
		<div class="">
			<div class="flex items-center">
				<a href={`/@${user.username}`}>
					<span class="block font-semibold text-lg sm:text-xl">{user.profile?.nickname}</span>
				</a>
			</div>
			<span class="badge variant-filled-primary">{user.profile?.field}</span>
		</div>
	</header>

	<div class="max-w-[450px]">
		<p class="text-sm line-clamp-3">{user.profile?.bio}</p>
	</div>
</div>
