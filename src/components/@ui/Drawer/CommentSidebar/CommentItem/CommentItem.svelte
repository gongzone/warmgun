<script lang="ts">
	import { createInfiniteQuery } from '@tanstack/svelte-query';

	import { findComments } from '$lib/client-fetch/comment';
	import InfiniteScroll from '$components/@utils/InfiniteScroll.svelte';
	import type { Comment } from '$lib/types/comment';
	import CommentView from '../CommentView/CommentView.svelte';

	export let articleId: number;
	export let comment: Comment;

	let isChildCommentOpen: boolean = false;

	$: childrenCommentQuery = createInfiniteQuery({
		queryKey: ['comments', articleId, comment.id],
		queryFn: findComments,
		getNextPageParam: (lastPage) => lastPage.nextCursor,
		keepPreviousData: true,
		enabled: !!comment.id && isChildCommentOpen
	});

	let root: Element;
</script>

<div>
	<CommentView {articleId} {comment} bind:isChildCommentOpen />
	{#if $childrenCommentQuery.isSuccess && isChildCommentOpen}
		<div class="pl-4 ml-4 py-3 border-l-4 border-l-secondary-700">
			<ul class="space-y-6" bind:this={root}>
				{#each $childrenCommentQuery.data.pages as { data }}
					{#each data as comment (comment.id)}
						<li>
							<CommentView {articleId} {comment} />
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
</div>
