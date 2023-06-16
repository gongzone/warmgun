<script lang="ts">
	import { createInfiniteQuery, useQueryClient } from '@tanstack/svelte-query';

	import { findComments } from '$lib/client-fetch/comment';
	import UserAvatar from '$components/@ui/UserAvatar.svelte';
	import { formatDate } from '$lib/utils/format';
	import HeartIcon from '$components/@icons/HeartIcon.svelte';
	import CommentIcon from '$components/@icons/CommentIcon.svelte';
	import InfiniteScroll from '$components/@utils/InfiniteScroll.svelte';
	import CommentTextarea from '../CommentTextarea/CommentTextarea.svelte';
	import { enhance } from '$app/forms';
	import { drawerStore } from '@skeletonlabs/skeleton';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';

	export let articleId: number;
	export let parentId: number | null;
	export let nickname: string | undefined;
	export let avatar: string | null | undefined;
	export let createdAt: Date;
	export let message: string;
	export let isLiked: boolean;
	export let likeCount: number;
	export let childrenCount: number;

	let isChildCommentOpen: boolean = false;
	let isReplyTextareaOpen: boolean = false;

	const queryClient = useQueryClient();

	$: childrenCommentQuery = createInfiniteQuery({
		queryKey: ['comments', articleId, parentId],
		queryFn: findComments,
		getNextPageParam: (lastPage) => lastPage.nextCursor,
		keepPreviousData: true,
		enabled: !!parentId && isChildCommentOpen
	});

	let root: Element;

	$: console.log($childrenCommentQuery.data);
	$: likeAction = !isLiked ? '?/likeComment' : '?/unlikeComment';
</script>

<div>
	<div class="flex flex-col gap-2">
		<div class="flex items-center gap-2">
			<UserAvatar src={avatar} width="w-10" />
			<div class="flex flex-col gap-1">
				<p class="text-sm font-bold">{nickname}</p>
				<p class="opacity-50 text-xs">{formatDate(createdAt)}</p>
			</div>
		</div>
		<div class="pb-2 space-y-4">
			<p class="font-extralight">{message}</p>
			<div class="flex items-center justify-between">
				<div class="flex items-center gap-4">
					<form
						method="POST"
						action={likeAction}
						use:enhance={({ formElement, formData, action, cancel, submitter }) => {
							return async ({ result, update }) => {
								if (result.type === 'redirect') {
									drawerStore.close();
									return await update();
								}

								await queryClient.invalidateQueries({ queryKey: ['comments', articleId, null] });
								update();
							};
						}}
					>
						<input type="hidden" name="commentId" value={parentId} />
						<button type="submit" class="flex items-center gap-1">
							<HeartIcon class="w-5 h-5 {isLiked ? 'text-red-500' : ''}" /><span class="text-sm"
								>{likeCount}</span
							>
						</button>
					</form>
					{#if childrenCount > 0}
						<button
							type="button"
							class="flex items-center gap-1"
							on:click={() => {
								isChildCommentOpen = !isChildCommentOpen;
							}}
						>
							<CommentIcon class="w-5 h-5" />
							<span class="text-sm">{childrenCount} 답글</span>
						</button>
					{/if}
				</div>
				<button
					type="button"
					class="btn btn-sm variant-filled text-sm"
					on:click={() => {
						if (!$page.data.user) {
							drawerStore.close();
							return goto('/auth/login');
						}

						isReplyTextareaOpen = !isReplyTextareaOpen;
					}}>{isReplyTextareaOpen ? '접기' : '답글 달기'}</button
				>
			</div>
		</div>
	</div>

	{#if $childrenCommentQuery.isSuccess && isChildCommentOpen}
		<div class="pl-4 ml-4 py-3 border-l-4 border-l-secondary-700">
			<ul class="space-y-6" bind:this={root}>
				{#each $childrenCommentQuery.data.pages as { data }}
					{#each data as comment (comment.id)}
						<li>
							<div class="flex flex-col gap-2">
								<div class="flex items-center gap-2">
									<UserAvatar src={comment.user.profile?.avatar} width="w-10" />
									<div class="flex flex-col gap-1">
										<p class="text-sm font-bold">{comment.user.profile?.nickname}</p>
										<p class="opacity-50 text-xs">{formatDate(comment.createdAt)}</p>
									</div>
								</div>
								<div class="pb-2 space-y-4">
									<p class="font-extralight">{comment.content}</p>
									<div class="flex items-center justify-between">
										<div class="flex items-center gap-4">
											<form
												method="POST"
												action={!comment.isLiked ? '?/likeComment' : '?/unlikeComment'}
												use:enhance={({ formElement, formData, action, cancel, submitter }) => {
													return async ({ result, update }) => {
														if (result.type === 'redirect') {
															return drawerStore.close();
															return await update();
														}

														await queryClient.invalidateQueries({
															queryKey: ['comments', articleId, parentId]
														});
														update();
													};
												}}
											>
												<input type="hidden" name="commentId" value={comment.id} />
												<button type="submit" class="flex items-center gap-1">
													<HeartIcon class="w-5 h-5 {comment.isLiked ? 'text-red-500' : ''}" />
													<span class="text-sm">
														{comment._count.likes}
													</span>
												</button>
											</form>
										</div>
									</div>
								</div>
							</div>
						</li>
					{/each}
				{/each}
			</ul>
			<InfiniteScroll
				{root}
				fetchFn={() => $childrenCommentQuery.fetchNextPage()}
				hasNextPage={$childrenCommentQuery.hasNextPage}
			/>
		</div>
	{/if}

	{#if isReplyTextareaOpen}
		<div class="pl-4 ml-4 py-3 border-l-4 border-l-secondary-700">
			<CommentTextarea
				{articleId}
				{parentId}
				userDisplay={false}
				cb={async () => {
					await queryClient.invalidateQueries({ queryKey: ['comments', articleId, parentId] });
					isChildCommentOpen = true;
					isReplyTextareaOpen = false;
				}}
			/>
		</div>
	{/if}
</div>
