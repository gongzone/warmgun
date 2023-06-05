<script lang="ts">
	import './editor.postcss';

	import { onMount, onDestroy } from 'svelte';
	import { browser } from '$app/environment';
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
	let bodyCache: any = null;

	$: {
		if (!body) {
			bodyCache = null;
		} else if (!bodyCache) {
			bodyCache = body;
		} else if (JSON.stringify(body.blocks) !== JSON.stringify(bodyCache.blocks)) {
			bodyCache = body;
		}
	}

	$: if (isEditorReady) {
		bodyCache && bodyCache.blocks.length > 0 ? editor.render(bodyCache) : editor.clear();
	}

	onMount(() => {
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
	class="!prose dark:!prose-invert prose-headings:font-token prose-blockquote:!border-l-secondary-500 prose-code:!text-base prose-a:!underline-offset-[8px] mx-auto"
>
	<div id="editor" />
</article>
