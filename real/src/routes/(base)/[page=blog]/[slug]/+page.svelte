<script lang="ts">
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import {
		createInfiniteQuery,
		createMutation,
		createQueries,
		createQuery
	} from '@tanstack/svelte-query';
	import type { PageData, PageServerData } from './$types';
	import HeartIcon from '$components/@icons/HeartIcon.svelte';
	import MoreIcon from '$components/@icons/MoreIcon.svelte';

	import { Avatar, popup, type PopupSettings } from '@skeletonlabs/skeleton';
	import CommentContent from '$components/Comment/CommentContent.svelte';
	import CommentTextarea from '$components/Comment/CommentTextarea.svelte';
	import UserAvatar from '$components/@ui/UserAvatar.svelte';
	import TextEditor from '$components/Editor/TextEditor.svelte';
	// import Comment from '$components/Comment/Comment.svelte';
	import { triggerConfirmModal } from '$components/@ui/Modal/modal';
	import { enhance } from '$app/forms';
	import InfiniteScroll from '$components/@utils/InfiniteScroll.svelte';
	import { findComments } from '$lib/client-fetch/comment';
	import type { InfiniteData } from '$lib/types/Infinite-data';
	import type { Comment } from '$lib/types/comment';

	export let data: PageData;

	let popupSettings: PopupSettings = {
		// Set the event as: click | hover | hover-click | focus | focus-click
		event: 'click',
		placement: 'bottom',
		// Provide a matching 'data-popup' value.
		target: 'examplePopup'
	};

	let openChildComments: {
		[key: number]: boolean;
	} = {};
	let childCommentsCache: {
		[key: number]: Comment[];
	} = {};

	$: parentCommentsQuery = createInfiniteQuery({
		queryKey: ['comments', data.article.id, null],
		queryFn: findComments,
		getNextPageParam: (lastPage) => lastPage.nextCursor,
		keepPreviousData: true
	});

	$: childCommentsQueries = createQueries(
		Object.keys(openChildComments).map((parentId) => ({
			queryKey: ['comments', data.article.id, +parentId],
			queryFn: findComments,
			getNextPageParam: (lastPage: InfiniteData<Comment>) => lastPage.nextCursor,
			onSuccess: (result: InfiniteData<Comment>) => {
				childCommentsCache[+parentId] = result.data;
			},
			enabled: openChildComments[+parentId]
		}))
	);

	$: if ($childCommentsQueries.length) {
	}
</script>

<main class="max-w-[760px] mx-auto py-12">
	<div class="flex justify-between items-center mb-6">
		<div class="flex gap-2">
			<UserAvatar src={data.blogUser.profile?.avatar} />
			<div class="flex flex-col gap-1">
				<span class="!font-serif">{data.blogUser.profile?.nickname}</span>
				<span class="!fotn-serif text-xs text-surface-400">{data.blogUser.profile?.field}</span>
			</div>
		</div>

		<div class="flex items-center gap-4">
			<form method="POST" use:enhance class="flex items-center gap-1">
				<input type="hidden" name="articleId" value={data.article.id} />
				{#if !data.isLiked}
					<button type="submit" formaction="?/like" class="">
						<HeartIcon class="w-6 h-6" />
					</button>
				{:else}
					<button type="submit" formaction="?/unlike" class="">
						<HeartIcon class="w-6 h-6 text-red-500" />
					</button>
				{/if}
				<span>{data.article._count.likes}</span>
			</form>
			{#if data.isOwner}
				<button class="btn-icon variant-ringed-tertiary" use:popup={popupSettings}>
					<MoreIcon />
				</button>
				<div class="card p-4" data-popup="examplePopup">
					<ul class="list">
						<li>
							<a href={`/write/${data.article.id}?mode=edit`}>수정하기</a>
						</li>
						<li>
							<button
								on:click={() =>
									triggerConfirmModal(
										'아티클 삭제',
										'정말로 삭제하시겠습니까? 이 행동은 돌이킬 수 없습니다!',
										(confirm) => {
											if (confirm) {
											}
										}
									)}>삭제하기</button
							>
						</li>
					</ul>
					<!-- Append the arrow element -->
					<div class="arrow bg-surface-800" />
				</div>
			{/if}
		</div>
	</div>

	<div class="flex flex-col gap-6 mb-16">
		<div class="w-full h-[478px] overflow-hidden rounded-lg">
			<img
				class="w-full h-full object-cover"
				src={data.article.coverImage}
				alt={data.article.title}
			/>
		</div>

		<div class="space-y-4">
			<h2 class="unstyled text-center font-bold font-serif text-3xl">
				{data.article.title}
			</h2>
		</div>
	</div>

	<div class="viewer-container">
		<TextEditor readOnly={true} body={data.article.body} />
	</div>

	<div class="mt-32 space-y-6">
		<span class="font-bold text-2xl">{0}개의 댓글</span>

		<div class="space-y-12">
			<CommentTextarea articleId={data.article.id} parentId={null} />

			{#if $parentCommentsQuery.isSuccess}
				<ul class="space-y-8">
					{#each $parentCommentsQuery.data.pages as { data: queryData }}
						{#each queryData as comment (comment.id)}
							<li class="card px-8 py-8 space-y-8">
								<CommentContent
									user={comment.user}
									content={comment.content}
									date={comment.createdAt}
								/>
								<div class="">
									{#if !openChildComments[comment.id]}
										<button
											class="btn btn-sm variant-filled-primary"
											on:click={() => {
												openChildComments[comment.id] = true;
											}}>답글 ({comment._count.children})</button
										>
									{:else}
										<button
											class="btn btn-sm variant-filled-primary"
											on:click={() => {
												openChildComments[comment.id] = false;
											}}>답글 접기</button
										>
									{/if}
								</div>

								{#if openChildComments[comment.id]}
									<div class="px-8 ml-8 border-l border-l-surface-500 border-dashed">
										<ul class="space-y-8">
											{#if childCommentsCache[comment.id]}
												{#each childCommentsCache[comment.id] as childComment}
													<li class="card px-8 py-5 !bg-surface-700">
														<CommentContent
															user={childComment.user}
															content={childComment.content}
															date={childComment.createdAt}
														/>
													</li>
												{/each}
											{/if}
										</ul>
										<div class="mt-8">
											<CommentTextarea articleId={data.article.id} parentId={comment.id} />
										</div>
									</div>
								{/if}
							</li>
						{/each}
					{/each}
				</ul>

				<InfiniteScroll
					fetchFn={$parentCommentsQuery.fetchNextPage}
					hasNextPage={$parentCommentsQuery.hasNextPage}
				/>
			{/if}
		</div>
	</div>
</main>
