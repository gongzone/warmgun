<script context="module" lang="ts">
	export interface ArticleEditorData {
		title: string;
		body: JSONContent;
		plaintext: string;
	}
</script>

<script lang="ts">
	import type { HTMLContent, JSONContent } from '@tiptap/core';
	import type { Editor as CoreEditor } from '$components/@editor/core/editor';
	import type { Readable } from 'svelte/motion';
	import Editor from '$components/@editor/Editor.svelte';
	import AutosizeTextarea from '$components/@ui/AutosizeTextarea.svelte';
	import Separator from '$components/@ui/Separator.svelte';

	let editor: Readable<CoreEditor>;

	export let title: string;
	export let body: JSONContent | HTMLContent = '';
	export function getEditorData(): ArticleEditorData {
		return {
			title,
			body: $editor.getJSON(),
			plaintext: $editor.getText({ blockSeparator: ' ' })
		};
	}
</script>

<div class="max-w-prose mx-auto my-10">
	<AutosizeTextarea name="title" placeholder="제목을 입력하세요" bind:value={title} size="xl" />
	<Separator class="my-1 mb-8" />
	<Editor bind:editor {body} />
</div>
