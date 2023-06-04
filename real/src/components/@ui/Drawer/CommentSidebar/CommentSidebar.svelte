<script lang="ts">
	import { drawerStore } from '@skeletonlabs/skeleton';
	import { createInfiniteQuery, createQueries } from '@tanstack/svelte-query';

	import CommentHeader from './CommentHeader/CommentHeader.svelte';
	import CommentContent from '$components/Comment/CommentContent.svelte';
	import TextEditor from '$components/Editor/TextEditor.svelte';
	import InfiniteScroll from '$components/@utils/InfiniteScroll.svelte';
	import CommentTextarea from './CommentTextarea/CommentTextarea.svelte';
	import { findComments } from '$lib/client-fetch/comment';
	import type { InfiniteData } from '$lib/types/Infinite-data';
	import type { Comment } from '$lib/types/comment';
	import type { CommentMeta } from '../drawer';
	import CommentItem from './CommentItem/CommentItem.svelte';

	$: ({ articleId, totalCount } = $drawerStore.meta as CommentMeta);

	let openChildComments: {
		[key: number]: boolean;
	} = {};
	let childCommentsCache: {
		[key: number]: Comment[];
	} = {};

	$: parentCommentsQuery = createInfiniteQuery({
		queryKey: ['comments', articleId, null],
		queryFn: findComments,
		getNextPageParam: (lastPage) => lastPage.nextCursor,
		keepPreviousData: true
	});

	let root: Element;

	// $: childCommentsQueries = createQueries(
	// 	Object.keys(openChildComments).map((parentId) => ({
	// 		queryKey: ['comments', articleId, +parentId],
	// 		queryFn: findComments,
	// 		getNextPageParam: (lastPage: any) => lastPage.nextCursor,
	// 		onSuccess: (result: any) => {
	// 			childCommentsCache[+parentId] = result.data;
	// 		},
	// 		enabled: openChildComments[+parentId]
	// 	}))
	// );

	// $: if ($childCommentsQueries.length) {
	// 	console.log($childCommentsQueries[0]);
	// }
</script>

<div id="comment-sidebar" class="px-8 py-8" bind:this={root}>
	<div class="space-y-4">
		<CommentHeader {totalCount} />
		<CommentTextarea articleId={1} parentId={null} />
	</div>

	<hr class="my-8" />

	{#if $parentCommentsQuery.isSuccess}
		<ul class="space-y-6">
			{#each $parentCommentsQuery.data.pages as { data }}
				{#each data as comment (comment.id)}
					<li>
						<CommentItem
							{articleId}
							parentId={comment.id}
							nickname={comment.user.profile?.nickname}
							avatar={comment.user.profile?.avatar}
							createdAt={comment.createdAt}
							message={comment.content}
							childrenCount={comment._count.children}
						/>
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
