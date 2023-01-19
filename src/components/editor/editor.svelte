<script lang="ts">
	import '../../styles/editor.postcss';

	import { Editor, Viewer } from 'bytemd';
	import gfm from '@bytemd/plugin-gfm';
	import highlight from '@bytemd/plugin-highlight-ssr';

	import { convertBlobToBase64 } from '$lib/utils/base64';

	let markdownBody: string;

	let editorConfig = {
		autofocus: true
	};

	const plugins = [gfm(), highlight()];

	async function handleUploadImages(files: File[]) {
		console.log(files);

		const encodedUrls = await Promise.all(
			files.map((file) => convertBlobToBase64(file) as Promise<string>)
		);

		// Todo: loading spinner 작동 필요
		const response = await fetch('/api/images', {
			method: 'POST',
			body: JSON.stringify({ imageUrls: encodedUrls }),
			headers: {
				'content-type': 'application/json'
			}
		});

		const urls = await response.json();

		console.log(urls);

		const images = urls.map((url: string) => ({
			url
		}));

		console.log(images);

		return images;
	}

	function handleChange(e: any) {
		markdownBody = e.detail.value;
	}
</script>

<Editor
	mode="auto"
	uploadImages={handleUploadImages}
	value={markdownBody}
	{editorConfig}
	{plugins}
	on:change={handleChange}
/>
