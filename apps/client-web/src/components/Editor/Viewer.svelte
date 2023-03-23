<script lang="ts">
	import '../../styles/editor.postcss';

	import { onMount, onDestroy } from 'svelte';
	import EditorJS, { type OutputData } from '@editorjs/editorjs';
	import Header from '@editorjs/header';
	import Quote from '@editorjs/quote';
	import Alert from 'editorjs-alert';
	import NestedList from '@editorjs/nested-list';
	import ImageTool from '@editorjs/image';
	import Marker from '@editorjs/marker';
	import Underline from '@editorjs/underline';
	import InlineCode from '@editorjs/inline-code';

	let editor: EditorJS | null;
	export let body: OutputData | null;

	let isEditorReady = false;

	onMount(() => {
		editor = new EditorJS({
			holder: 'viewer',
			readOnly: true,
			data: body
				? body
				: ({
						time: new Date().getTime(),
						blocks: [
							{
								type: 'paragraph',
								data: {
									text: ''
								}
							}
						],
						version: '2.26.5'
				  } satisfies OutputData),
			tools: {
				header: {
					class: Header
				},
				quote: {
					class: Quote
				},
				alert: {
					class: Alert
				},
				list: {
					class: NestedList
				},
				image: {
					class: ImageTool
				},
				Marker: {
					class: Marker
				},
				inlineCode: {
					class: InlineCode
				},
				underline: {
					class: Underline
				}
			},
			onReady: () => {
				isEditorReady = true;
			}
		});
	});

	onDestroy(() => {
		if (editor) {
			editor.destroy();
			editor = null;
		}
	});
</script>

<div id="viewer" class="" />
