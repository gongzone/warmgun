<script lang="ts">
	import { onMount } from 'svelte';
	import type { Readable } from 'svelte/store';

	import { lowlight } from 'lowlight';
	import html from 'highlight.js/lib/languages/xml';
	import css from 'highlight.js/lib/languages/css';
	import js from 'highlight.js/lib/languages/javascript';
	import ts from 'highlight.js/lib/languages/typescript';

	import {
		createEditor,
		Editor,
		Document,
		Text,
		Paragraph,
		Heading,
		ListItem,
		BulletList,
		OrderedList,
		Blockquote,
		CodeBlockLowlight,
		Image,
		Bold,
		Italic,
		Strike,
		InlineCode,
		TextStyle,
		Underline,
		Link,
		History
	} from './Editor';

	import EditorContent from './_EditorContent.svelte';
	import BubbleMenu from './_BubbleMenu.svelte';

	lowlight.registerLanguage('html', html);
	lowlight.registerLanguage('css', css);
	lowlight.registerLanguage('js', js);
	lowlight.registerLanguage('ts', ts);

	let editor: Readable<Editor>;

	onMount(() => {
		editor = createEditor({
			extensions: [
				Document,
				Text,
				Paragraph,
				Heading.configure({ levels: [1, 2, 3] }),
				ListItem,
				BulletList,
				OrderedList,
				Blockquote,
				CodeBlockLowlight.configure({
					lowlight
				}),
				Image,
				Bold,
				Italic,
				Strike,
				InlineCode,
				TextStyle,
				Underline,
				Link,
				History
			],
			editorProps: {
				attributes: {
					class: 'prose dark:prose-invert p-4 focus:outline-none'
				}
			},
			autofocus: true,
			editable: true,
			content: `Hello world!`
		});
	});
</script>

<EditorContent editor={$editor} />
{#if $editor}
	<BubbleMenu editor={$editor}>
		<button on:click={() => $editor.chain().focus().toggleBold().run()}> 굵게 </button>
		<button on:click={() => $editor.chain().focus().toggleItalic().run()}> 기울임 </button>
		<button on:click={() => $editor.chain().focus().toggleStrike().run()}> 취소선 </button>
		<button on:click={() => $editor.chain().focus().toggleCode().run()}> 인라인 코드 </button>
	</BubbleMenu>
{/if}
