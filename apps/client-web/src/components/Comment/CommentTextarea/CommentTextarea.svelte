<script lang="ts">
	import { findMe } from '$api/user';
	import UserPiece from '$components/@ui/Block/UserPiece.svelte';
	import { createMutation, createQuery, useQueryClient } from '@tanstack/svelte-query';
	import AutosizedTextarea from '$components/@Base/Input/AutoSizedTextarea.svelte';
	import { createComment } from '$api/comment';

	let content: string;
	export let articleId: number;
	export let parentId: number | null;

	const queryClient = useQueryClient();

	const meQuery = createQuery({
		queryKey: ['me'],
		queryFn: findMe
	});

	$: createArticleMutation = createMutation({
		mutationFn: () => createComment(articleId, parentId, { content }),
		onSuccess: async () => {
			await queryClient.invalidateQueries(['parentComments', articleId]);
		}
	});
</script>

{#if $meQuery.data}
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
<button
	type="button"
	class="btn variant-filled-surface"
	on:click={() => $createArticleMutation.mutate()}>댓글 달기</button
>
