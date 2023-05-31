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
	import ArticleDetail from './_ArticleDetail/ArticleDetail.svelte';

	export let data: PageData;

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

<div class="container">
	<main class="max-w-[800px] mx-auto py-12 space-y-16">
		<section class="space-y-6">
			<ArticleDetail
				blogUser={data.blogUser}
				article={data.article}
				isOwner={data.isOwner}
				isLiked={data.isLiked}
			/>
		</section>

		<div class="viewer-container">
			<TextEditor readOnly={true} body={data.article.body} />
		</div>

		<div id="comment-container" class="mt-32 space-y-6">
			<span class="font-bold text-2xl">{data.article._count.comments}개의 댓글</span>

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
</div>
