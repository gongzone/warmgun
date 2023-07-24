<script lang="ts">
	import 'highlight.js/styles/github-dark.css';

	import { onMount } from 'svelte';
	import type { Readable } from 'svelte/store';

	import { lowlight } from 'lowlight';

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

	import SvelteNodeViewRenderer from './NodeView/SvelteNodeViewRenderer';

	import EditorContent from './_EditorContent.svelte';
	import BubbleMenu from './_BubbleMenu.svelte';
	import FloatingMenu from './_FloatingMenu.svelte';
	import SeparatorVetical from '$components/@ui/SeparatorVetical.svelte';

	import HeadingOneIcon from '$components/@icons/HeadingOneIcon.svelte';
	import HeadingTwoIcon from '$components/@icons/HeadingTwoIcon.svelte';
	import HeadingThreeIcon from '$components/@icons/HeadingThreeIcon.svelte';
	import BoldIcon from '$components/@icons/BoldIcon.svelte';
	import ItalicIcon from '$components/@icons/ItalicIcon.svelte';
	import UnderlineIcon from '$components/@icons/UnderlineIcon.svelte';
	import StrikeIcon from '$components/@icons/StrikeIcon.svelte';
	import InlineCodeIcon from '$components/@icons/InlineCodeIcon.svelte';
	import ImageIcon from '$components/@icons/ImageIcon.svelte';
	import CodeBoxIcon from '$components/@icons/CodeBoxIcon.svelte';
	import CodeBlockSelect from './_CodeBlockSelect.svelte';

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
				CodeBlockLowlight.extend({
					addNodeView() {
						return SvelteNodeViewRenderer(CodeBlockSelect);
					}
				}).configure({
					lowlight,
					languageClassPrefix: 'language-',
					defaultLanguage: 'plaintext'
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
					class: 'prose dark:prose-invert focus:outline-none'
				}
			},
			autofocus: true,
			editable: true,
			content: `
        <p>
          That’s a boring paragraph followed by a fenced code block:
        </p>
        <pre><code>for (var i=1; i <= 20; i++)
{
  if (i % 15 == 0)
    console.log("FizzBuzz");
  else if (i % 3 == 0)
    console.log("Fizz");
  else if (i % 5 == 0)
    console.log("Buzz");
  else
    console.log(i);
}</code></pre>
        <p>
          Press Command/Ctrl + Enter to leave the fenced code block and continue typing in boring paragraphs.
        </p>
		
      `
		});
	});
</script>

<EditorContent editor={$editor} />
{#if $editor}
	<BubbleMenu
		class="flex items-center bg-surface-900-50-token text-surface-50-900-token rounded-md shadow-xl"
		editor={$editor}
		tippyOptions={{ duration: 100 }}
		let:BubbleMenuButton
	>
		<BubbleMenuButton
			isActive={$editor.isActive('heading', { level: 1 })}
			on:click={() => $editor.chain().focus().toggleHeading({ level: 1 }).run()}
		>
			<HeadingOneIcon class="w-4 h-4" />
		</BubbleMenuButton>
		<BubbleMenuButton
			isActive={$editor.isActive('heading', { level: 2 })}
			on:click={() => $editor.chain().focus().toggleHeading({ level: 2 }).run()}
		>
			<HeadingTwoIcon class="w-4 h-4" />
		</BubbleMenuButton>
		<BubbleMenuButton
			isActive={$editor.isActive('heading', { level: 3 })}
			on:click={() => $editor.chain().focus().toggleHeading({ level: 3 }).run()}
		>
			<HeadingThreeIcon class="w-4 h-4" />
		</BubbleMenuButton>

		<SeparatorVetical class="h-6 mx-1" />

		<BubbleMenuButton
			isActive={$editor.isActive('bold')}
			on:click={() => $editor.chain().focus().toggleBold().run()}
		>
			<BoldIcon class="w-4 h-4" />
		</BubbleMenuButton>
		<BubbleMenuButton
			isActive={$editor.isActive('italic')}
			on:click={() => $editor.chain().focus().toggleItalic().run()}
		>
			<ItalicIcon class="w-4 h-4" />
		</BubbleMenuButton>
		<BubbleMenuButton
			isActive={$editor.isActive('underline')}
			on:click={() => $editor.chain().focus().toggleUnderline().run()}
		>
			<UnderlineIcon class="w-4 h-4" />
		</BubbleMenuButton>
		<BubbleMenuButton
			isActive={$editor.isActive('strike')}
			on:click={() => $editor.chain().focus().toggleStrike().run()}
		>
			<StrikeIcon class="w-4 h-4" />
		</BubbleMenuButton>
		<BubbleMenuButton
			isActive={$editor.isActive('code')}
			on:click={() => $editor.chain().focus().toggleCode().run()}
		>
			<InlineCodeIcon class="w-4 h-4" />
		</BubbleMenuButton>
	</BubbleMenu>

	<FloatingMenu editor={$editor} let:FloatingMenuButton>
		<FloatingMenuButton
			isActive={$editor.isActive('heading', { level: 1 })}
			on:click={() => $editor.chain().focus().toggleHeading({ level: 1 }).run()}
			><HeadingOneIcon class="w-4 h-4" /></FloatingMenuButton
		>
		<FloatingMenuButton
			isActive={$editor.isActive('heading', { level: 2 })}
			on:click={() => $editor.chain().focus().toggleHeading({ level: 2 }).run()}
			><HeadingTwoIcon class="w-4 h-4" /></FloatingMenuButton
		>
		<FloatingMenuButton
			isActive={$editor.isActive('heading', { level: 3 })}
			on:click={() => $editor.chain().focus().toggleHeading({ level: 3 }).run()}
			><HeadingThreeIcon class="w-4 h-4" /></FloatingMenuButton
		>

		<FloatingMenuButton
			isActive={$editor.isActive('heading', { level: 3 })}
			on:click={() => $editor.chain().focus().toggleHeading({ level: 3 }).run()}
			><ImageIcon class="w-4 h-4" /></FloatingMenuButton
		>
		<FloatingMenuButton
			isActive={$editor.isActive('codeBlock')}
			on:click={() => $editor.chain().focus().toggleCodeBlock().run()}
			><CodeBoxIcon class="w-4 h-4" /></FloatingMenuButton
		>
		<FloatingMenuButton
			isActive={$editor.isActive('codeBlock')}
			on:click={() => $editor.chain().focus().toggleCodeBlock().run()}
			><CodeBoxIcon class="w-4 h-4" /></FloatingMenuButton
		>
	</FloatingMenu>
{/if}
