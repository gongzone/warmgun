<script lang="ts">
	import { enhance } from '$app/forms';

	import type { Article } from '$lib/types/article';

	import TextWithIcon from '$components/@ui/TextWithIcon.svelte';
	import HeartIcon from '$components/@icons/HeartIcon.svelte';
	import CommentIcon from '$components/@icons/CommentIcon.svelte';
	import ArticleControlPopup from '$components/@ui/Popup/ArticleControlPopup.svelte';
	import { openCommentSidebar } from '$components/@ui/Drawer/drawer';

	export let article: Article;
	export let isOwner: boolean;
	export let isLiked: boolean;

	$: likesAction = isLiked ? '?/unlike' : '?/like';
</script>

<div class="flex justify-between border-t border-b py-2 border-t-surface-500 border-b-surface-500">
	<div class="flex items-center gap-4">
		<form method="POST" action={likesAction} class="flex items-center" use:enhance>
			<input type="hidden" name="articleId" value={article.id} />
			<button type="submit">
				<TextWithIcon
					icon={HeartIcon}
					iconClass={isLiked ? 'text-red-500' : ''}
					size="xl"
					textClass="!text-sm"
					gap={1}>{article._count.likes}</TextWithIcon
				>
			</button>
		</form>
		<button
			type="button"
			on:click={() =>
				openCommentSidebar({
					meta: { articleId: article.id, totalCount: article._count.comments }
				})}
		>
			<TextWithIcon icon={CommentIcon} textClass="!text-sm" size="xl" gap={1}
				>{article._count.comments}</TextWithIcon
			>
		</button>
	</div>

	<div>
		{#if isOwner}
			<ArticleControlPopup articleId={article.id} />
		{/if}
	</div>
</div>
