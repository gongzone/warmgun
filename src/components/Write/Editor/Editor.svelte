<script lang="ts">
	import 'highlight.js/styles/github-dark.css';

	import { onMount } from 'svelte';
	import type { Readable } from 'svelte/store';
	import { isTextSelection } from '@tiptap/core';

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
		History,
		Dropcursor,
		Gapcursor
	} from './Editor';

	import { uploadImage } from '$lib/client-fetch/upload-image';
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
	import ListUnorderedIcon from '$components/@icons/ListUnorderedIcon.svelte';
	import QuoteIcon from '$components/@icons/QuoteIcon.svelte';
	import LinkIcon from '$components/@icons/LinkIcon.svelte';

	let editor: Readable<Editor>;

	let elemFileInput: HTMLElement;
	let files: FileList | undefined = undefined;
	let isLoading: boolean = false;

	function onButtonClick(): void {
		elemFileInput.click();
	}

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
				History,
				Dropcursor,
				Gapcursor.configure({
					HTMLAttributes: {
						class: '!border-t-surface-50'
					}
				})
			],
			editorProps: {
				attributes: {
					class: 'prose dark:prose-invert focus:outline-none'
				}
			},
			autofocus: false,
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
		tippyOptions={{ maxWidth: 350, duration: 100 }}
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
		<BubbleMenuButton
			isActive={$editor.isActive('link')}
			on:click={() => {
				const previousUrl = $editor.getAttributes('link').href;

				if (previousUrl) {
					return $editor.chain().focus().toggleLink({ href: previousUrl }).run();
				}

				const url = window.prompt('URL을 입력해주세요.');

				if (!url) {
					return;
				}

				$editor.chain().focus().toggleLink({ href: url }).run();
			}}
		>
			<LinkIcon class="w-4 h-4" />
		</BubbleMenuButton>
	</BubbleMenu>
{/if}

{#if $editor}
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

		<div>
			<div class="w-0 h-0 overflow-hidden">
				<input
					type="file"
					bind:this={elemFileInput}
					bind:files
					on:change={async () => {
						if (!files) return;
						isLoading = true;
						const image = await uploadImage(files[0]);
						$editor.chain().focus().setImage({ src: image }).run();
						isLoading = false;
					}}
				/>
			</div>
			<FloatingMenuButton isActive={$editor.isActive('image')} on:click={() => onButtonClick()}
				><ImageIcon class="w-4 h-4" /></FloatingMenuButton
			>
		</div>

		<FloatingMenuButton
			isActive={$editor.isActive('bulletList')}
			on:click={() => $editor.chain().focus().toggleBulletList().run()}
			><ListUnorderedIcon class="w-4 h-4" /></FloatingMenuButton
		>

		<FloatingMenuButton
			isActive={$editor.isActive('blockquote')}
			on:click={() => $editor.chain().focus().toggleBlockquote().run()}
			><QuoteIcon class="w-4 h-4" /></FloatingMenuButton
		>

		<FloatingMenuButton
			isActive={$editor.isActive('codeBlock')}
			on:click={() => $editor.chain().focus().toggleCodeBlock().run()}
			><CodeBoxIcon class="w-4 h-4" /></FloatingMenuButton
		>
	</FloatingMenu>
{/if}
