<script lang="ts">
	import { page } from '$app/stores';
	import { drawerStore } from '@skeletonlabs/skeleton';
	import { createInfiniteQuery } from '@tanstack/svelte-query';

	import CommentHeader from './CommentHeader/CommentHeader.svelte';
	import InfiniteScroll from '$components/@utils/InfiniteScroll.svelte';
	import CommentTextarea from './CommentTextarea/CommentTextarea.svelte';
	import { findComments } from '$lib/client-fetch/comment';
	import type { CommentMeta } from '../drawer';
	import CommentItem from './CommentItem/CommentItem.svelte';

	$: ({ articleId, totalCount } = $drawerStore.meta as CommentMeta);

	$: parentCommentsQuery = createInfiniteQuery({
		queryKey: ['comments', articleId, null],
		queryFn: findComments,
		getNextPageParam: (lastPage) => lastPage.nextCursor,
		keepPreviousData: true
	});

	let root: Element;
</script>

<div id="comment-sidebar" class="px-8 py-8" bind:this={root}>
	<div class="space-y-4">
		<CommentHeader totalCount={$page.data?.article?._count.comments} />
		<CommentTextarea {articleId} parentId={null} />
	</div>

	<hr class="my-8" />

	{#if $parentCommentsQuery.isSuccess}
		<ul class="space-y-6">
			{#each $parentCommentsQuery.data.pages as { data }}
				{#each data as comment (comment.id)}
					<li>
						<CommentItem {articleId} {comment} />
						<hr />
					</li>
				{/each}
			{/each}
		</ul>
		<InfiniteScroll
			{root}
			fetchFn={() => $parentCommentsQuery.fetchNextPage()}
			hasNextPage={$parentCommentsQuery.hasNextPage}
		/>
	{/if}

	<div class="h-40" />
</div>
