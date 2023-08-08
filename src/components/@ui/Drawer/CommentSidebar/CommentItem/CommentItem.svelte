<script lang="ts">
	import { createInfiniteQuery } from '@tanstack/svelte-query';

	import InfiniteScroll from '$components/@utils/InfiniteScroll.svelte';
	import type { ArticleComment, PostComment } from '$lib/types/comment';
	import CommentView from '../CommentView/CommentView.svelte';
	import { api } from '$lib/api/api';

	export let mode: 'article' | 'post' = 'article';
	export let id: number;
	export let comment: ArticleComment | PostComment;

	let isChildCommentOpen: boolean = false;

	$: childrenCommentQuery = createInfiniteQuery({
		queryKey: ['comments', mode, id, comment.id],
		queryFn: api().findComments,
		getNextPageParam: (lastPage) => lastPage.nextCursor,
		keepPreviousData: true,
		enabled: !!comment.id && isChildCommentOpen
	});

	let root: Element;

	$: console.log($childrenCommentQuery);
</script>

<div>
	<CommentView {mode} {id} {comment} bind:isChildCommentOpen />
	{#if $childrenCommentQuery.isSuccess && isChildCommentOpen && $childrenCommentQuery.data.pages[0].data.length > 0}
		<div class="pl-4 ml-4 py-3 border-l-4 border-l-secondary-700">
			<ul class="space-y-6" bind:this={root}>
				{#each $childrenCommentQuery.data.pages as { data }}
					{#each data as comment (comment.id)}
						<li>
							<CommentView {mode} {id} {comment} />
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
