<script lang="ts">
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import AutosizeTextarea from '$components/@ui/AutosizeTextarea.svelte';

	export let articleId: number;
	export let parentId: number | null;

	let content: string;
</script>

<div class="space-y-4">
	{#if $page.data.user}
		{$page.data.user.username}
	{/if}
	<div class="flex flex-col border border-surface-500 rounded-lg p-2 bg-surface-900">
		<div class="min-h-[108px] rounded-t-lg">
			<AutosizeTextarea
				name="comment"
				placeholder="댓글을 입력하세요"
				bind:value={content}
				size="sm"
			/>
		</div>
		<div class="flex justify-end px-4 py-4">
			<form method="POST" action="?/createComment" use:enhance>
				<input type="hidden" name="articleId" value={articleId} />
				<input type="hidden" name="parentId" value={parentId} />
				<input type="hidden" name="content" value={content} />
				<button type="submit" class="btn variant-filled-surface">댓글 달기</button>
			</form>
		</div>
	</div>
</div>
