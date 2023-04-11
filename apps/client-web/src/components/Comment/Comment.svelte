<script lang="ts">
	import { createComment, findArticleComments } from '$api/comment';
	import AutosizedTextarea from '$components/@Base/Input/AutoSizedTextarea.svelte';
	import UserPiece from '$components/@ui/Block/UserPiece.svelte';
	import {
		createInfiniteQuery,
		createMutation,
		createQueries,
		createQuery,
		useQueryClient
	} from '@tanstack/svelte-query';

	import ConmmentTextarea from './CommentTextarea/CommentTextarea.svelte';
	import type { Comment, PaginationData } from '$lib/types/api';

	export let articleId: number;
	let open: {
		[key: number]: boolean;
	} = {};
	let bye: {
		[key: number]: Comment[];
	} = {};

	$: parentCommentsQuery = createInfiniteQuery({
		queryKey: ['parentComments', articleId],
		queryFn: findArticleComments,
		getNextPageParam: (lastPage) => lastPage.nextCursor
	});

	/*Todo: fix */

	$: childCommentsQueries = createQueries(
		Object.keys(open).map((key) => {
			return {
				queryKey: ['childComments', articleId, key],
				queryFn: findArticleComments,
				getNextPageParam: (lastPage: PaginationData<Comment>) => lastPage.nextCursor,
				onSuccess: (result: PaginationData<Comment>) => {
					bye[result.data[0].parentId!] = result.data;
				}
			};
		})
	);
</script>

<div class="mt-20">
	<ConmmentTextarea {articleId} parentId={null} />

	{#if $parentCommentsQuery.isSuccess}
		<ul>
			{#each $parentCommentsQuery.data.pages as { data }}
				{#each data as comment (comment.id)}
					<li class="card p-5">
						<p>{comment.content}</p>
						{#if !open[comment.id]}
							<button
								class="btn variant-ringed-secondary"
								on:click={() => {
									open = { ...open, [comment.id]: true };
								}}>Reply</button
							>
						{:else}
							<button
								class="btn variant-ringed-secondary"
								on:click={() => {
									open[comment.id] = false;
								}}>취소</button
							>
						{/if}

						{#if open[comment.id] === true}
							{#if bye[comment.id]}
								{#each bye[comment.id] as children (children.id)}
									{children.content}
								{/each}
							{/if}

							<ConmmentTextarea {articleId} parentId={comment.id} />
							<button
								class="btn variant-ringed-secondary"
								on:click={() => {
									open[comment.id] = false;
								}}>취소</button
							>
						{/if}
					</li>
				{/each}
			{/each}
		</ul>
	{/if}
</div>
