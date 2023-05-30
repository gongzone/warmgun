<script lang="ts">
	import './editor.postcss';

	import { onMount, onDestroy } from 'svelte';
	import EditorJS, { type EditorConfig } from '@editorjs/editorjs';

	import { editorTools } from './editor-tools';
	import { editorInternationalization } from './editor-i18n';

	export let body: any;
	export let readOnly: true | false = false;
	export const getCurrentBody = async () => {
		return await editor.save();
	};

	let editor: EditorJS;
	let isEditorReady: boolean = false;

	$: if (isEditorReady) {
		body && body.blocks.length > 0 ? editor.render(body) : editor.clear();
	}

	onMount(async () => {
		const editorConfig = {
			holder: 'editor',
			placeholder: '당신의 이야기를 들려주세요.',
			tools: editorTools,
			i18n: editorInternationalization,
			defaultBlock: 'paragraph',
			readOnly: readOnly,
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

<article
	class="prose prose-headings:font-token prose-code:!text-base prose-a:!underline-offset-[8px]"
>
	<div id="editor" />
</article>
