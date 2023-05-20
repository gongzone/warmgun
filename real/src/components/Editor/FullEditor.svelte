<script lang="ts">
	import type { OutputData } from '@editorjs/editorjs';

	import AutosizedTextarea from '$components/@ui/AutosizeTextarea.svelte';
	import TextEditor from './TextEditor.svelte';
	import type { CurrentEditorData } from '$lib/types/editor';

	export let title: string = '';
	export let body: any;
	export const getCurrentEditorData = async () => {
		return { title, body: await getCurrentBody() } satisfies CurrentEditorData;
	};

	let getCurrentBody: () => Promise<OutputData>;
</script>

<div class="space-y-4">
	<div>
		<AutosizedTextarea name="title" placeholder="제목을 입력하세요" bind:value={title} size="xl" />
		<div class="px-3">
			<hr />
		</div>
	</div>

	<div class="px-3">
		<TextEditor {body} bind:getCurrentBody />
	</div>
</div>
