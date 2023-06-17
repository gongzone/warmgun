<script lang="ts">
	import { popup, type PopupSettings } from '@skeletonlabs/skeleton';

	import { triggerConfirmModal } from '$components/@ui/Modal/modal';

	import MoreIcon from '$components/@icons/MoreIcon.svelte';
	import { enhance } from '$app/forms';
	import { useQueryClient } from '@tanstack/svelte-query';

	export let articleId: number;
	export let commentId: number | null;
	export let parentId: number | null;

	let deleteForm: HTMLFormElement;

	const popupKey = `comment-control-popup-${commentId}`;
	const popupSettings: PopupSettings = {
		event: 'click',
		target: popupKey,
		placement: 'bottom'
	};

	const queryClient = useQueryClient();
</script>

<button class="btn-icon btn-icon-sm variant-ringed-tertiary" use:popup={popupSettings}>
	<MoreIcon class="w-5 h-5" />
</button>

<div class="card w-32 p-2 shadow-xl z-40 !rounded-md" data-popup={popupKey}>
	<ul class="list-nav">
		<li>
			<button class="w-full" type="button" on:click>수정하기</button>
		</li>
		<li>
			<form
				method="POST"
				action="?/deleteComment"
				bind:this={deleteForm}
				use:enhance={() => {
					return async ({ result, update }) => {
						if (parentId) {
							await queryClient.invalidateQueries({ queryKey: ['comments', articleId, null] });
						}
						await queryClient.invalidateQueries({ queryKey: ['comments', articleId, parentId] });

						await update();
					};
				}}
			>
				<input type="hidden" name="commentId" value={commentId} />
				<button
					type="button"
					class="w-full"
					on:click={() =>
						triggerConfirmModal('댓글 삭제', '정말로 해당 댓글을 삭제하시겠습니까?', (confirm) => {
							if (confirm) deleteForm.requestSubmit();
						})}>삭제하기</button
				>
			</form>
		</li>
	</ul>
	<div class="arrow bg-surface-800" />
</div>
