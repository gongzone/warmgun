<script lang="ts">
	import { enhance } from '$app/forms';

	import type { Article } from '$lib/types/article';

	import TextWithIcon from '$components/@ui/TextWithIcon.svelte';
	import HeartIcon from '$components/@icons/HeartIcon.svelte';
	import CommentIcon from '$components/@icons/CommentIcon.svelte';
	import { openCommentSidebar } from '$components/@ui/Drawer/drawer';

	export let article: Article;
	export let isLiked: boolean;

	$: likesAction = isLiked ? '?/unlike' : '?/like';
</script>

<div class="flex justify-end my-12">
	<div class="flex justify-center items-center gap-4">
		<form method="POST" action={likesAction} class="flex items-center" use:enhance>
			<input type="hidden" name="articleId" value={article.id} />
			<button type="submit" class="btn variant-filled-primary">
				<TextWithIcon
					icon={HeartIcon}
					iconClass={isLiked ? 'text-red-600' : ''}
					size="xl"
					textClass="!text-sm"
					gap={1}>{article._count.likes}</TextWithIcon
				>
			</button>
		</form>
		<button
			type="button"
			class="btn variant-filled"
			on:click={() =>
				openCommentSidebar({
					meta: { articleId: article.id, totalCount: article._count.comments }
				})}
		>
			<TextWithIcon icon={CommentIcon} textClass="!text-sm" size="xl" gap={1}
				>댓글 {article._count.comments}</TextWithIcon
			>
		</button>
	</div>
</div>
