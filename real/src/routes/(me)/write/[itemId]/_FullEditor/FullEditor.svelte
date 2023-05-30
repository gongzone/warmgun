<script lang="ts">
	import type { OutputData } from '@editorjs/editorjs';
	import type { CurrentEditorData } from '$lib/types/editor';

	import AutosizedTextarea from '$components/@ui/AutosizeTextarea.svelte';
	import TextEditor from '$components/Editor/TextEditor.svelte';

	export let title: string = '';
	export let body: any;
	export const getCurrentEditorData = async () => {
		return { title, body: await getCurrentBody() } satisfies CurrentEditorData;
	};

	let getCurrentBody: () => Promise<OutputData>;
</script>

<div class="max-w-[650px] mx-auto py-2 px-2 space-y-4 md:my-4">
	<div>
		<AutosizedTextarea name="title" placeholder="제목을 입력하세요" bind:value={title} size="xl" />
		<hr />
	</div>

	<TextEditor {body} bind:getCurrentBody />
</div>
