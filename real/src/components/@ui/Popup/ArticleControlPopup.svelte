<script lang="ts">
	import { popup, type PopupSettings } from '@skeletonlabs/skeleton';

	import { triggerConfirmModal } from '$components/@ui/Modal/modal';

	import MoreIcon from '$components/@icons/MoreIcon.svelte';
	import { enhance } from '$app/forms';

	export let articleId: number;

	let deleteForm: HTMLFormElement;

	const popupKey = 'article-control-popup';
	const popupSettings: PopupSettings = {
		event: 'click',
		target: popupKey,
		placement: 'bottom'
	};
</script>

<button class="btn-icon btn-icon-sm variant-ringed-tertiary" use:popup={popupSettings}>
	<MoreIcon class="w-5 h-5" />
</button>

<div class="card w-40 p-4 shadow-xl z-40 !rounded-md" data-popup={popupKey}>
	<ul class="list-nav">
		<li>
			<a href={`/write/${articleId}?mode=edit`}>수정하기</a>
		</li>
		<li>
			<form method="POST" action="?/deleteArticle" bind:this={deleteForm} use:enhance>
				<input type="hidden" name="articleId" value={articleId} />
				<button
					type="button"
					class="w-full"
					on:click={() =>
						triggerConfirmModal(
							'아티클 삭제',
							'정말로 해당 아티클을 삭제하시겠습니까?',
							(confirm) => {
								if (confirm) deleteForm.requestSubmit();
							}
						)}>삭제하기</button
				>
			</form>
		</li>
	</ul>
	<div class="arrow bg-surface-800" />
</div>
