<script lang="ts">
	import type { PageData, ActionData } from './$types';
	import { drawerStore } from '@skeletonlabs/skeleton';
	import { enhance } from '$app/forms';

	import BackButton from '$components/@custom/BackButton.svelte';
	import triggerToast from '$components/@custom/toast';
	import Editor from '../../_Editor/Editor.svelte';

	export let data: PageData;
	export let form: ActionData;

	$: writer = data.writer;
	$: id = data.draft.id;
	$: title = data.draft.title;
	$: description = data.draft.description;
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
			<BackButton href={writer.blogUrl} />
			<button
				type="button"
				class="btn-icon variant-ghost-surface"
				on:click={() => drawerStore.open()}><i class="ri-article-line ri-lg" /></button
			>
		</div>

		<div class="flex gap-4">
			<button formaction="?/save" class="btn variant-filled-secondary btn-base">저장</button>
			<button class="btn variant-filled-primary btn-base">글 등록</button>
		</div>
	</div>

	<div class="py-2 px-2 md:px-5 lg:px-[4vw] lg:py-4">
		<Editor {title} {description} {body} />
		<input type="hidden" name="draftId" value={id} hidden />
	</div>
</form>
