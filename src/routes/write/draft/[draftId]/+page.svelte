<script lang="ts">
	import type { PageData, ActionData } from './$types';
	import { enhance } from '$app/forms';

	import { openDraftSidebar, openPublishSidebar } from '$components/Drawer/WriteDrawer/drawer';
	import { triggerToast } from '$components/Message/toast';

	import BackButton from '$components/@custom/BackButton.svelte';
	import Editor from '../../_Editor/Editor.svelte';

	export let data: PageData;
	export let form: ActionData;

	$: writer = data.writer;
	$: id = data.draft.id;
	$: title = data.draft.title;
	$: subTitle = data.draft.subTitle;
	$: body = data.draft.body;

	$: if (form) {
		form.success ? triggerToast(form.message, 'success') : triggerToast(form.message, 'error');
	}
</script>

<form
	method="POST"
	use:enhance={() =>
		({ update }) =>
			update({ reset: false })}
>
	<div class="flex justify-between p-5">
		<div>
			<BackButton href={`/@${writer.username}`} />
			<button type="button" class="btn-icon variant-ghost-surface" on:click={openDraftSidebar}
				><i class="ri-article-line ri-lg" /></button
			>
		</div>
		<div class="flex gap-4">
			<button formaction="?/save" class="btn variant-filled-secondary">저장</button>
			<button
				type="button"
				class="btn variant-filled-primary"
				on:click={() => openPublishSidebar({ title, subTitle, body })}>글 등록</button
			>
		</div>
	</div>

	<div class="py-2 px-2 md:px-5 lg:px-[4vw] lg:py-4">
		<Editor
			{title}
			{subTitle}
			{body}
			on:change={(e) => {
				title = e.detail.title;
				subTitle = e.detail.subTitle;
				body = e.detail.body;
			}}
		/>
		<input type="hidden" name="draftId" value={id} hidden />
	</div>
</form>
