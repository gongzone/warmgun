<script lang="ts">
	import { Editor as BytemdEditor } from 'bytemd';
	import gfm from '@bytemd/plugin-gfm';
	import highlight from '@bytemd/plugin-highlight-ssr';

	import { uploadImages } from '$lib/client-fetch/image';

	import AutosizedTextarea from '$components/@custom/AutosizedTextarea.svelte';

	export let title: string;
	export let description: string;
	export let body: string;

	export const plugins = [gfm(), highlight()];
	export const editorConfig = {
		autofocus: true
	};

	async function handleUploadImages(markdownImages: File[]) {
		const urls = await uploadImages(markdownImages);
		return urls.map((url) => ({ url }));
	}

	function handleChangeBody(e: any) {
		body = e.detail.value;
	}
</script>

<div class="mb-4">
	<AutosizedTextarea name="title" placeholder="제목을 입력하세요" value={title} size="lg" />
	<AutosizedTextarea
		name="description"
		placeholder="소제목을 입력하세요"
		value={description}
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
		on:change={handleChangeBody}
	/>
	<input type="hidden" name="body" value={body} hidden />
</div>
