<script lang="ts">
	import { findMe } from '$api/user';
	import UserPiece from '$components/@ui/Block/UserPiece.svelte';
	import { createMutation, createQuery, useQueryClient } from '@tanstack/svelte-query';
	import AutosizedTextarea from '$components/@Base/Input/AutoSizedTextarea.svelte';
	import { createComment } from '$api/comment';

	export let articleId: number;
	export let parentId: number | null;
	let content: string;

	const queryClient = useQueryClient();

	const meQuery = createQuery({
		queryKey: ['me'],
		queryFn: findMe
	});

	$: createCommentMutation = createMutation({
		mutationFn: () => createComment(articleId, parentId, { content }),
		onSuccess: async () => {
			await queryClient.invalidateQueries(['comments', articleId, parentId]);
		}
	});
</script>

<div class="space-y-4">
	{#if $meQuery.data}
		<UserPiece
			username={$meQuery.data.username}
			nickname={$meQuery.data.profile.nickname}
			avatar={$meQuery.data.profile.avatar}
		/>
	{/if}
	<div class="flex flex-col border border-surface-500 rounded-lg p-2 bg-surface-900">
		<div class="min-h-[108px] rounded-t-lg">
			<AutosizedTextarea
				name="comment"
				placeholder="댓글을 입력하세요"
				bind:value={content}
				size="sm"
			/>
		</div>
		<div class="flex justify-end px-4 py-4">
			<button
				type="button"
				class="btn variant-filled-surface"
				on:click={() => {
					if (!$meQuery.data) {
						/* Todo: Auth Modal 띄우기 */
						return;
					}

					$createCommentMutation.mutate();
				}}>댓글 달기</button
			>
		</div>
	</div>
</div>
