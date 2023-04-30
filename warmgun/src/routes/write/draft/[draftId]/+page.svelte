<script lang="ts">
	import type { ActionData } from './$types';
	import type { PageData } from './$types';
	import { page } from '$app/stores';
	import { goto, invalidateAll } from '$app/navigation';
	import { applyAction, enhance } from '$app/forms';
	import { AppBar } from '@skeletonlabs/skeleton';
	import type { OutputData } from '@editorjs/editorjs';
	import BackIcon from '~icons/ri/arrow-left-line';
	import DraftIcon from '~icons/ri/article-line';

	import { triggerToast } from '$components/@ui-singletons/Toast/toast';
	import { openDraftSidebar, openPublishSidebar } from '$components/@ui-singletons/Drawer/drawer';
	import Editor from '$components/@ui-blocks/Editor/Editor.svelte';

	export let data: PageData;
	export let form: ActionData;

	let getCurrentEditorData: () => Promise<{ title: string; subTitle: string; body: OutputData }>;

	$: ({ draft, drafts } = data);

	$: if (form?.message) {
		triggerToast(`${form.isSuccess ? 'success' : 'warning'}`, form.message);
	}
</script>

<AppBar padding="px-2 py-4 sm:px-4" background="bg-transparent">
	<svelte:fragment slot="lead">
		<button type="button" class="btn-icon" on:click={() => goto('/')}>
			<BackIcon class="w-6 h-6" />
		</button>
		<button
			type="button"
			class="btn-icon btn-icon-lg variant-ghost-surface"
			on:click={() => openDraftSidebar({ meta: drafts })}
		>
			<DraftIcon class="w-6 h-6" />
		</button>
	</svelte:fragment>

	<svelte:fragment slot="trail">
		<form
			method="POST"
			action="?/saveDraft"
			use:enhance={async ({ data }) => {
				const { title, subTitle, body } = await getCurrentEditorData();
				data.append('draftId', $page.params.draftId);
				data.append('title', title);
				data.append('subTitle', subTitle);
				data.append('body', JSON.stringify(body));

				return async ({ result, update }) => {
					if (result.type === 'success') {
						await invalidateAll();
					}
					await applyAction(result);
				};
			}}
		>
			<button type="submit" class="btn variant-filled-secondary">저장</button>
		</form>
		<button
			type="button"
			class="btn variant-filled-primary"
			on:click={async () => {
				const { title, subTitle, body } = await getCurrentEditorData();
				openPublishSidebar({ meta: { title, subTitle, body } });
			}}>글 등록</button
		>
	</svelte:fragment>
</AppBar>

<main class="max-w-[700px] mx-auto py-2 px-2 md:my-4">
	<Editor
		initData={{ title: draft.title, subTitle: draft.subTitle, body: draft.body }}
		bind:getCurrentEditorData
	/>
</main>
