<script lang="ts">
	import './editor.postcss';

	import { onMount, onDestroy } from 'svelte';
	import EditorJS, { type OutputData, type EditorConfig } from '@editorjs/editorjs';

	import { editorTools } from './editor-tools';

	export let body: OutputData | null;
	export const getCurrentBody = async () => {
		return await editor.save();
	};

	let editor: EditorJS;
	let isEditorReady: boolean = false;

	$: if (isEditorReady) {
		body ? editor.render(body) : editor.clear();
	}

	onMount(async () => {
		const editorConfig = {
			holder: 'editor',
			placeholder: '당신의 이야기를 들려주세요.',
			tools: editorTools,
			onReady: () => {
				isEditorReady = true;
			}
		} satisfies EditorConfig;

		editor = new EditorJS(editorConfig);
	});

	onDestroy(() => {
		editor.destroy();
	});
</script>

<div id="editor" />
