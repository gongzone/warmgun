<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { lowlight } from 'lowlight/lib/core';
	import { Editor } from '@tiptap/core';

	/* Nodes */
	import Blockquote from '@tiptap/extension-blockquote';
	import BulletList from '@tiptap/extension-bullet-list';
	import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
	import Document from '@tiptap/extension-document';
	import HardBreak from '@tiptap/extension-hard-break';
	import Heading from '@tiptap/extension-heading';
	import HorizontalRule from '@tiptap/extension-horizontal-rule';
	import Highlight from '@tiptap/extension-highlight';
	import Image from '@tiptap/extension-image';
	import ListItem from '@tiptap/extension-list-item';
	import OrderedList from '@tiptap/extension-ordered-list';
	import Paragraph from '@tiptap/extension-paragraph';
	import Text from '@tiptap/extension-text';

	/* Marks */
	import Bold from '@tiptap/extension-bold';
	import Code from '@tiptap/extension-code';
	import Italic from '@tiptap/extension-italic';
	import Strike from '@tiptap/extension-strike';

	/* Extensions */
	import Dropcursor from '@tiptap/extension-dropcursor';
	import Gapcursor from '@tiptap/extension-gapcursor';
	import History from '@tiptap/extension-history';

	import 'highlight.js/styles/github-dark.css';
	import css from 'highlight.js/lib/languages/css';
	import js from 'highlight.js/lib/languages/javascript';
	import ts from 'highlight.js/lib/languages/typescript';
	import html from 'highlight.js/lib/languages/xml';

	import SvelteNodeViewRenderer from '$lib/editor/svelte-node-view-renderer';

	import EditorHeader from './editor-header.svelte';
	import CodeBlock from './code-block.svelte';

	lowlight.registerLanguage('html', html);
	lowlight.registerLanguage('css', css);
	lowlight.registerLanguage('js', js);
	lowlight.registerLanguage('ts', ts);

	let element: Element;
	let editor: Editor;

	onMount(() => {
		editor = new Editor({
			element: element,
			extensions: [
				Blockquote,
				BulletList,
				CodeBlockLowlight.extend({
					addNodeView() {
						return SvelteNodeViewRenderer(CodeBlock);
					}
				}).configure({
					lowlight
				}),
				Document,
				HardBreak,
				HorizontalRule,
				Heading.configure({
					levels: [1, 2, 3]
				}),
				Highlight.configure({ multicolor: true }),
				Image,
				ListItem,
				OrderedList,
				Paragraph,
				Text,
				Bold,
				Code,
				Italic,
				Strike,
				Dropcursor.configure({
					width: 2
				}),
				Gapcursor,
				History
			],
			editorProps: {
				attributes: {
					class: 'prose h-full focus:outline-none'
				}
			},
			autofocus: 'start',
			content: '<p></p>',
			onTransaction: () => {
				// force re-render so `editor.isActive` works as expected
				editor = editor;
			}
		});
	});

	onDestroy(() => {
		if (editor) {
			editor.destroy();
		}
	});
</script>

<div class="editor dark:bg-surface-800 p-3">
	{#if editor}
		<EditorHeader {editor} />
	{/if}
	<div class="editor__content" bind:this={element} />
	<!-- <div class="editor__footer">sdasd</div> -->
</div>

<style>
	.editor {
		border-radius: 0.75rem;
		color: #0d0d0d;
		display: flex;
		flex-direction: column;
		max-height: 32rem;
	}

	.editor__content {
		flex: 1 1 auto;
		overflow-x: hidden;
		overflow-y: auto;
		padding: 1.25rem 1rem;
		-webkit-overflow-scrolling: touch;
	}

	.editor__footer {
		align-items: center;
		border-top: 3px solid #0d0d0d;
		color: #0d0d0d;
		display: flex;
		flex: 0 0 auto;
		font-size: 12px;
		flex-wrap: wrap;
		font-weight: 600;
		justify-content: space-between;
		padding: 0.25rem 0.75rem;
		white-space: nowrap;
	}
</style>
