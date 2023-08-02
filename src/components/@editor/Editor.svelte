<script lang="ts">
	import 'highlight.js/styles/github-dark.css';
	import { onMount } from 'svelte';
	import type { Readable } from 'svelte/store';
	import { lowlight } from 'lowlight';

	import { uploadImage } from '$lib/client-fetch/upload-image';
	import { EditorIcons } from '$components/@icons/editor';

	/* Core */
	import { createEditor, Editor } from './core/editor';

	/* Extensions */
	import {
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
		Gapcursor,
		Placeholder
	} from './extensions';

	/* Components */
	import EditorContent from './components/EditorContent.svelte';
	import BubbleMenu from './components/BubbleMenu/BubbleMenu.svelte';
	import FloatingMenu from './components/FloatingMenu/FloatingMenu.svelte';

	/* NodeViews */
	import SvelteNodeViewRenderer from './node-views/SvelteNodeViewRenderer';

	/* Customs */
	import CodeBlockLanguageSelect from './customs/CodeBlockLanguageSelect.svelte.svelte';
	import type { HTMLContent, JSONContent } from '@tiptap/core';

	export let editor: Readable<Editor> | undefined = undefined;
	export let body: JSONContent | HTMLContent = '';

	let elemFileInput: HTMLElement;
	let files: FileList | undefined = undefined;
	let isLoading: boolean = false;

	$: if ($editor?.isActive) {
		$editor.commands.setContent(body);
	}

	const bubbleMenus = [
		{
			name: 'headingOne',
			icon: EditorIcons.headingOne,
			isActive: () => $editor?.isActive('heading', { level: 1 }),
			onClick: () => $editor?.chain().focus().toggleHeading({ level: 1 }).run()
		},
		{
			name: 'headingTwo',
			icon: EditorIcons.headingTwo,
			isActive: () => $editor?.isActive('heading', { level: 2 }),
			onClick: () => $editor?.chain().focus().toggleHeading({ level: 2 }).run()
		},
		{
			name: 'headingThree',
			icon: EditorIcons.headingThree,
			isActive: () => $editor?.isActive('heading', { level: 3 }),
			onClick: () => $editor?.chain().focus().toggleHeading({ level: 3 }).run()
		},
		{
			name: 'bold',
			icon: EditorIcons.bold,
			isActive: () => $editor?.isActive('bold'),
			onClick: () => $editor?.chain().focus().toggleBold().run()
		},
		{
			name: 'italic',
			icon: EditorIcons.italic,
			isActive: () => $editor?.isActive('italic'),
			onClick: () => $editor?.chain().focus().toggleItalic().run
		},
		{
			name: 'underline',
			icon: EditorIcons.undeline,
			isActive: () => $editor?.isActive('undeline'),
			onClick: () => $editor?.chain().focus().toggleUnderline().run()
		},
		{
			name: 'strike',
			icon: EditorIcons.strike,
			isActive: () => $editor?.isActive('strike'),
			onClick: () => $editor?.chain().focus().toggleStrike().run()
		},
		{
			name: 'code',
			icon: EditorIcons.inlineCode,
			isActive: () => $editor?.isActive('code'),
			onClick: () => $editor?.chain().focus().toggleCode().run()
		},
		{
			name: 'link',
			icon: EditorIcons.link,
			isActive: () => $editor?.isActive('link'),
			onClick: () => {
				const previousUrl = $editor?.getAttributes('link').href;

				if (previousUrl) {
					return $editor?.chain().focus().toggleLink({ href: previousUrl }).run();
				}

				const url = window.prompt('URL을 입력해주세요.');

				if (!url) {
					return;
				}

				$editor?.chain().focus().toggleLink({ href: url }).run();
			}
		}
	];

	const floatingMenus = [
		{
			name: 'headingOne',
			icon: EditorIcons.headingOne,
			isActive: () => $editor?.isActive('heading', { level: 1 }),
			onClick: () => $editor?.chain().focus().toggleHeading({ level: 1 }).run()
		},
		{
			name: 'headingTwo',
			icon: EditorIcons.headingTwo,
			isActive: () => $editor?.isActive('heading', { level: 2 }),
			onClick: () => $editor?.chain().focus().toggleHeading({ level: 2 }).run()
		},
		{
			name: 'headingThree',
			icon: EditorIcons.headingThree,
			isActive: () => $editor?.isActive('heading', { level: 3 }),
			onClick: () => $editor?.chain().focus().toggleHeading({ level: 3 }).run()
		},
		{
			name: 'image',
			icon: EditorIcons.image,
			isActive: () => $editor?.isActive('image'),
			onClick: () => elemFileInput.click()
		},
		{
			name: 'bulletList',
			icon: EditorIcons.listUnordered,
			isActive: () => $editor?.isActive('bulletList'),
			onClick: () => $editor?.chain().focus().toggleBulletList().run()
		},
		{
			name: 'blockquote',
			icon: EditorIcons.quote,
			isActive: () => $editor?.isActive('blockquote'),
			onClick: () => $editor?.chain().focus().toggleBlockquote().run()
		},
		{
			name: 'codeBlock',
			icon: EditorIcons.codeBlockIcon,
			isActive: () => $editor?.isActive('codeBlock'),
			onClick: () => $editor?.chain().focus().toggleCodeBlock().run()
		}
	];

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
						return SvelteNodeViewRenderer(CodeBlockLanguageSelect);
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
				Gapcursor
			],
			editorProps: {
				attributes: {
					class: 'prose dark:prose-invert focus:outline-none'
				}
			},
			autofocus: false,
			editable: true
			// content: body
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
		{#each bubbleMenus as menu (menu.name)}
			<BubbleMenuButton isActive={menu.isActive()} on:click={menu.onClick}>
				<svelte:component this={menu.icon} class="w-4 h-4" />
			</BubbleMenuButton>
		{/each}
	</BubbleMenu>
{/if}

{#if $editor}
	<FloatingMenu editor={$editor} let:FloatingMenuButton>
		{#each floatingMenus as menu (menu.name)}
			<FloatingMenuButton isActive={menu.isActive()} on:click={menu.onClick}>
				<svelte:component this={menu.icon} class="w-4 h-4" />
			</FloatingMenuButton>
		{/each}
	</FloatingMenu>

	<div class="w-0 h-0 overflow-hidden">
		<input
			type="file"
			bind:this={elemFileInput}
			bind:files
			on:change={async () => {
				if (!files) return;
				isLoading = true;
				const image = await uploadImage(files[0]);
				$editor?.chain().focus().setImage({ src: image }).run();
				isLoading = false;
			}}
		/>
	</div>
{/if}
