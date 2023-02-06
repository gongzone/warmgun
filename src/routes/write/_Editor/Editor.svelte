<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { Editor as BytemdEditor } from 'bytemd';
	import gfm from '@bytemd/plugin-gfm';
	import highlight from '@bytemd/plugin-highlight-ssr';

	import { uploadImages } from '$lib/client-fetch/image';

	import AutosizedTextarea from '$components/@custom/AutosizedTextarea.svelte';

	export let title: string;
	export let subTitle: string;
	export let body: string;

	const dispatch = createEventDispatcher();

	const plugins = [gfm(), highlight()];
	const editorConfig = {
		autofocus: true
	};

	$: dispatch('change', { title, subTitle, body });

	async function handleUploadImages(markdownImages: File[]) {
		const urls = await uploadImages(markdownImages);
		return urls.map((url) => ({ url }));
	}
</script>

<div class="mb-4">
	<AutosizedTextarea name="title" placeholder="제목을 입력하세요" bind:value={title} size="lg" />
	<AutosizedTextarea
		name="subTitle"
		placeholder="소제목을 입력하세요"
		bind:value={subTitle}
		size="md"
	/>
</div>

<div>
	<BytemdEditor
		mode="auto"
		value={body}
		{editorConfig}
		{plugins}
		uploadImages={handleUploadImages}
		on:change={(e) => {
			body = e.detail.value;
		}}
	/>
	<input type="hidden" name="body" value={body} hidden />
</div>
