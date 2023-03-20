<script lang="ts">
	import type EditorJS from '@editorjs/editorjs';
	import DraftHeader from '$components/Header/DraftHeader.svelte';
	import Editor from '$components/Editor/Editor.svelte';
	import { createQuery } from '@tanstack/svelte-query';
	import { page } from '$app/stores';
	import { getDraftById } from '$api/draft';
	import type { OutputData } from '@editorjs/editorjs';

	let editor: EditorJS;
	let title: string;
	let subTitle: string;
	let body: OutputData | null = null;

	$: getDraftByIdQuery = createQuery({
		queryKey: ['drafts', $page.params['draftId']],
		queryFn: () => getDraftById($page.params['draftId'])
	});

	// for reactivity problem in binding inputs
	const updateInitEditorData = () => {
		if ($getDraftByIdQuery.data) {
			title = $getDraftByIdQuery.data.title;
			subTitle = $getDraftByIdQuery.data.subTitle;
			body = $getDraftByIdQuery.data.body;
		}
	};

	$: if ($getDraftByIdQuery.isSuccess) {
		updateInitEditorData();
	}
</script>

<DraftHeader
	getEditorData={async () => {
		const body = await editor.save();
		return { title, subTitle, body };
	}}
/>

<div class="py-2 px-2 max-w-[700px] mx-auto md:my-4">
	<Editor bind:editor bind:title bind:subTitle bind:body />
</div>
