<script lang="ts">
	import { getMe } from '$api/me';
	import AutosizedTextarea from '$components/@Base/Input/AutoSizedTextarea.svelte';
	import UserPiece from '$components/@ui/Block/UserPiece.svelte';
	import { createQuery } from '@tanstack/svelte-query';

	export let articleId: number;

	const meQuery = createQuery({
		queryKey: ['me'],
		queryFn: getMe
	});

	let content: string;
</script>

<div class="mt-20">
	{#if $meQuery.isSuccess}
		<UserPiece
			username={$meQuery.data.username}
			nickname={$meQuery.data.profile.nickname}
			avatar={$meQuery.data.profile.avatar}
		/>
	{/if}
	<div class="bg-surface-800 min-h-[120px] rounded-lg">
		<AutosizedTextarea
			name="comment"
			placeholder="댓글을 입력하세요"
			bind:value={content}
			size="sm"
		/>
	</div>
</div>
