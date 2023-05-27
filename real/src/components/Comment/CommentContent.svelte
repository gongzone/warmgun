<script lang="ts">
	import UserAvatar from '$components/@ui/UserAvatar.svelte';
	import type { BlogUser } from '$lib/types/user';
	import type { Profile } from '@prisma/client';

	export let user: {
		profile: Profile | null;
	};
	export let content: string;
	export let date: Date;
</script>

<div class="space-y-3">
	<div>
		<UserAvatar src={user.profile?.avatar} />
	</div>
	<p class="">{content}</p>
</div>
