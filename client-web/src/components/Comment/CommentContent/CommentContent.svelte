<script lang="ts">
	import UserPiece from '$components/@ui/Block/UserPiece.svelte';
	import type { User } from '$lib/types/api';
	import { formatDate } from '$lib/utils/format';

	export let user: User;
	export let content: string;
	export let date: Date;
</script>

<div class="space-y-3">
	<div>
		<UserPiece
			username={user.username}
			nickname={user.profile.nickname}
			avatar={user.profile.avatar}
			subText={formatDate(date)}
		/>
	</div>
	<p class="">{content}</p>
</div>
