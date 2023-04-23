<script lang="ts">
	import { createInfiniteQuery, createQueries } from '@tanstack/svelte-query';

	import type { Comment, PaginationData } from '$lib/types/api';
	import { findArticleComments } from '$api/comment';
	import ConmmentTextarea from './CommentTextarea/CommentTextarea.svelte';
	import CommentContent from './CommentContent/CommentContent.svelte';
	import InfiniteScroll from '$components/@utility/InfiniteScroll.svelte';

	export let articleId: number;
	let openChildComments: {
		[key: number]: boolean;
	} = {};
	let childCommentsCache: {
		[key: number]: Comment[];
	} = {};

	$: parentCommentsQuery = createInfiniteQuery({
		queryKey: ['comments', articleId, null],
		queryFn: findArticleComments,
		getNextPageParam: (lastPage) => lastPage.nextCursor,
		keepPreviousData: true
	});

	$: childCommentsQueries = createQueries(
		Object.keys(openChildComments).map((parentId) => ({
			queryKey: ['comments', articleId, +parentId],
			queryFn: findArticleComments,
			getNextPageParam: (lastPage: PaginationData<Comment>) => lastPage.nextCursor,
			onSuccess: (result: PaginationData<Comment>) => {
				childCommentsCache[+parentId] = result.data;
			},
			enabled: openChildComments[+parentId]
		}))
	);

	$: if ($childCommentsQueries.length) {
	}
</script>

<div class="space-y-12">
	<ConmmentTextarea {articleId} parentId={null} />

	{#if $parentCommentsQuery.isSuccess}
		<ul class="space-y-8">
			{#each $parentCommentsQuery.data.pages as { data }}
				{#each data as comment (comment.id)}
					<li class="card px-8 py-8 space-y-8">
						<CommentContent
							user={comment.user}
							content={comment.content}
							date={new Date(comment.createdAt)}
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
													date={new Date(childComment.createdAt)}
												/>
											</li>
										{/each}
									{/if}
								</ul>
								<div class="mt-8">
									<ConmmentTextarea {articleId} parentId={comment.id} />
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
