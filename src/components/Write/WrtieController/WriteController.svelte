<script lang="ts">
	import { enhance } from '$app/forms';
	import { page } from '$app/stores';
	import ArrowLeftIcon from '$components/@icons/ArrowLeftIcon.svelte';
	import DraftIcon from '$components/@icons/DraftIcon.svelte';
	import { openPublishSidebar } from '$components/Write/PublishSidebar/PublishSidebar.svelte';
	import type { ArticleEditorData } from '../ArticleEditor.svelte';
	import { openDraftDrawer } from '../DraftDrawer/DraftDrawer.svelte';

	export let getEditorData: () => ArticleEditorData;

	$: mode = $page.url.searchParams.get('mode') as 'draft' | 'edit';

	function onClickPublishHandler() {
		const { title, body, plaintext } = getEditorData();
		openPublishSidebar({
			mode,
			title,
			body,
			plaintext,
			coverImage: null,
			tags: [],
			category: 'ETC'
		});
	}
</script>

<header class="flex items-center justify-between px-2 py-4 sm:px-6 bg-surface-50-900-token">
	<div class="flex items-center gap-2">
		<a href="/" class="btn-icon">
			<ArrowLeftIcon class="w-6 h-6" />
		</a>
		<button
			type="button"
			class="btn-icon btn-icon-lg variant-ghost-surface"
			on:click={() => openDraftDrawer()}
		>
			<DraftIcon />
		</button>
	</div>

	<div class="flex items-center gap-2">
		<form
			method="POST"
			action="?/saveDraft"
			use:enhance={({ data }) => {
				const { title, body } = getEditorData();
				data.append('title', title);
				data.append('body', JSON.stringify(body));

				return async ({ update }) => {
					update();
				};
			}}
		>
			<button type="submit" class="btn variant-filled-secondary">저장</button>
		</form>
		<button type="button" class="btn variant-filled-primary" on:click={onClickPublishHandler}
			>글 등록</button
		>
	</div>
</header>
