<script lang="ts">
	import './editor.postcss';

	import { onMount, onDestroy } from 'svelte';
	import EditorJS, { type OutputData, type EditorConfig } from '@editorjs/editorjs';

	import { editorTools } from './editor-tools';

	export let initBody: OutputData | null;

	let editor: EditorJS;

	onMount(async () => {
		const editorConfig = {
			holder: 'editor',
			placeholder: '당신의 이야기를 들려주세요.',
			tools: editorTools,
			...(initBody && { data: initBody })
		} satisfies EditorConfig;

		editor = new EditorJS(editorConfig);
	});

	onDestroy(() => {
		editor.destroy();
	});
</script>

<div id="editor" />
