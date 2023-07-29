<script context="module" lang="ts">
	export interface PostEditorData {
		title: string;
		body: JSONContent;
		community: Community;
	}
</script>

<script lang="ts">
	import type { Editor as CoreEditor } from '$components/@editor/core/editor';
	import Editor from '$components/@editor/Editor.svelte';
	import { communities, type Community } from '$lib/constants/communities';

	import type { Readable } from 'svelte/store';
	import type { JSONContent } from '@tiptap/core';

	let editor: Readable<CoreEditor>;

	let community: Community = 'FREE';
	let title: string = '';
	export function getEditorData(): PostEditorData {
		return {
			title,
			body: $editor.getJSON(),
			community
		};
	}
</script>

<div class="flex items-center gap-2 mb-8">
	<select class="select w-32 rounded-md" bind:value={community}>
		{#each Object.entries(communities) as [communityEnum, { title }] (communityEnum)}
			<option value={communityEnum}>{title}</option>
		{/each}
	</select>

	<input
		class="input"
		title="제목"
		type="text"
		placeholder="제목을 입력해주세요"
		bind:value={title}
	/>
</div>

<div class="min-h-[300px] border border-surface-600 p-4 rounded-lg">
	<Editor bind:editor />
</div>
