<script lang="ts">
	import { page } from '$app/stores';
	import { drawerStore } from '@skeletonlabs/skeleton';
	import { createInfiniteQuery } from '@tanstack/svelte-query';

	import CommentHeader from './CommentHeader/CommentHeader.svelte';
	import InfiniteScroll from '$components/@utils/InfiniteScroll.svelte';
	import CommentTextarea from './CommentTextarea/CommentTextarea.svelte';
	import type { CommentMeta } from '../drawer';
	import CommentItem from './CommentItem/CommentItem.svelte';
	import { api } from '$lib/api/api';

	$: ({ mode, id, totalCount } = $drawerStore.meta as CommentMeta);

	$: parentCommentsQuery = createInfiniteQuery({
		queryKey: ['comments', mode, id, null],
		queryFn: api().findComments,
		getNextPageParam: (lastPage) => lastPage.nextCursor,
		keepPreviousData: true
	});

	let root: Element;
</script>

<div id="comment-sidebar" class="px-8 py-8" bind:this={root}>
	<div class="space-y-4">
		<CommentHeader
			totalCount={$page.data?.article?._count.comments ?? $page.data?.post._count.comments}
		/>
		<CommentTextarea {mode} {id} parentId={null} />
	</div>

	<hr class="my-8" />

	{#if $parentCommentsQuery.isSuccess}
		<ul class="space-y-6">
			{#each $parentCommentsQuery.data.pages as { data }}
				{#each data as comment (comment.id)}
					<li>
						<CommentItem {mode} {id} {comment} />
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
