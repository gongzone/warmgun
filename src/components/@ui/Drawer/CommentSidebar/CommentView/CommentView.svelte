<script lang="ts">
	import type { ArticleComment, PostComment } from '$lib/types/comment';
	import type { SubmitFunction } from '@sveltejs/kit';

	import { formatCount, formatDate } from '$lib/utils/format';
	import CommentControlPopup from '$components/@ui/Popup/CommentControlPopup.svelte';
	import UserAvatar from '$components/@ui/UserAvatar.svelte';
	import { enhance } from '$app/forms';
	import { drawerStore } from '@skeletonlabs/skeleton';
	import { useQueryClient } from '@tanstack/svelte-query';
	import HeartIcon from '$components/@icons/HeartIcon.svelte';
	import CommentIcon from '$components/@icons/CommentIcon.svelte';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import CommentTextarea from '../CommentTextarea/CommentTextarea.svelte';

	export let mode: 'article' | 'post' = 'article';
	export let id: number;
	export let comment: ArticleComment | PostComment;
	export let isChildCommentOpen: boolean = false;

	let isEditing: boolean = false;
	let isReplyTextareaOpen: boolean = false;

	const queryClient = useQueryClient();

	$: likesAction = !comment.isLiked ? '?/likeComment' : '?/unlikeComment';

	const likesHandler: SubmitFunction = () => {
		return async ({ result, update }) => {
			if (result.type === 'redirect') {
				drawerStore.close();
				return await update();
			}

			await queryClient.invalidateQueries({ queryKey: ['comments', mode, id, comment.parentId] });
			await update();
		};
	};
</script>

{#if !isEditing}
	<div class="flex flex-col gap-2">
		<div class="flex items-center justify-between">
			<div class="flex items-center gap-2">
				<a href="/@{comment.user.username}" on:click={() => drawerStore.close()}>
					<UserAvatar src={comment.user.profile?.avatar} width="w-10" />
				</a>
				<div class="flex flex-col gap-1">
					<a href="/@{comment.user.username}" on:click={() => drawerStore.close()}>
						<p class="text-sm font-bold">{comment.user.profile?.nickname}</p>
					</a>
					<p class="opacity-50 text-xs">{formatDate(comment.createdAt)}</p>
				</div>
			</div>

			{#if comment.isOwned}
				<CommentControlPopup
					commentId={comment.id}
					parentId={comment.parentId}
					{mode}
					{id}
					on:click={() => {
						isEditing = true;
						isChildCommentOpen = false;
						isReplyTextareaOpen = false;
					}}
				/>
			{/if}
		</div>

		<div class="pb-2 space-y-4">
			<p class="font-extralight">{comment.content}</p>
			<div class="flex items-center justify-between">
				<div class="flex items-center gap-4">
					<form method="POST" action={likesAction} use:enhance={likesHandler}>
						<input type="hidden" name="commentId" value={comment.id} />
						<button type="submit" class="flex items-center gap-1">
							<HeartIcon class="w-5 h-5 {comment.isLiked ? 'text-red-500' : ''}" />
							<span class="text-sm">{formatCount(comment._count.likes)}</span>
						</button>
					</form>

					{#if comment._count.children > 0 && comment.parentId === null}
						<button
							type="button"
							class="flex items-center gap-1"
							on:click={() => {
								isChildCommentOpen = !isChildCommentOpen;
							}}
						>
							<CommentIcon class="w-5 h-5" />
							<span class="text-sm">
								{#if isChildCommentOpen}
									답글 접기
								{:else}
									{formatCount(comment._count.children)} 답글
								{/if}
							</span>
						</button>
					{/if}
				</div>

				{#if comment.parentId === null}
					<button
						type="button"
						class="btn btn-sm variant-filled text-sm"
						on:click={() => {
							if (!$page.data.user) {
								drawerStore.close();
								return goto('/auth/login');
							}
							isReplyTextareaOpen = !isReplyTextareaOpen;
						}}>{isReplyTextareaOpen ? '취소' : '답글 달기'}</button
					>
				{/if}
			</div>
		</div>
	</div>
{:else}
	<CommentTextarea
		isEditingMode={true}
		{mode}
		commentId={comment.id}
		{id}
		parentId={comment.parentId}
		userDisplay={false}
		content={comment.content}
		cb={async () => {
			isEditing = false;
		}}
		on:click={() => {
			isEditing = false;
		}}
	/>
{/if}

{#if isReplyTextareaOpen}
	<div class="pl-4 ml-4 py-3 border-l-4 border-l-secondary-700">
		<CommentTextarea
			{mode}
			{id}
			parentId={comment.id}
			userDisplay={false}
			cb={async () => {
				await queryClient.invalidateQueries({ queryKey: ['comments', mode, id, comment.id] });
				isChildCommentOpen = true;
				isReplyTextareaOpen = false;
			}}
		/>
	</div>
{/if}
