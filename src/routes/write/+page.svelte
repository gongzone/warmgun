<script lang="ts">
	import type { SubmitFunction } from '@sveltejs/kit';
	import { afterNavigate } from '$app/navigation';
	import { base } from '$app/paths';
	import { enhance } from '$app/forms';
	import { tooltip, FileButton } from '@skeletonlabs/skeleton';
	import autosize from 'autosize';
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

	let titleTextarea: Element;
	let descriptionTextarea: Element;

	let previousPage: string = base;
	let files: FileList;

	afterNavigate(({ from }) => {
		previousPage = from?.url.pathname || previousPage;
	});

	const submitHandler: SubmitFunction = ({ form, data, action, cancel }) => {
		data.append('body', markdownBody);
	};

	$: titleTextarea ? autosize(titleTextarea) : null;
	$: descriptionTextarea ? autosize(descriptionTextarea) : null;
	$: console.log(files);
</script>

<form method="POST" use:enhance={submitHandler}>
	<div class="flex justify-between mb-8">
		<a
			href={previousPage}
			class="btn-icon btn-ghost-surface"
			use:tooltip={{
				content: '돌아가기',
				position: 'right',
				background: '!bg-surface-500',
				width: '!w-24'
			}}><i class="ri-arrow-left-line ri-lg" /></a
		>
		<button class="btn btn-filled-primary btn-base">글 등록</button>
	</div>

	<div class="flex justify-end">
		<FileButton bind:files button="btn-icon btn-filled-secondary" title="커버 이미지"
			><i class="ri-image-add-line ri-lg" /></FileButton
		>
	</div>

	<div class="mb-4">
		<textarea
			class="unstyled h-14 text-3xl"
			name="title"
			placeholder="제목을 입력하세요"
			bind:this={titleTextarea}
		/>
		<textarea
			class="unstyled h-8"
			name="description"
			placeholder="소제목을 입력하세요"
			bind:this={descriptionTextarea}
		/>
	</div>

	<Editor
		mode="auto"
		uploadImages={handleUploadImages}
		value={markdownBody}
		{editorConfig}
		{plugins}
		on:change={handleChange}
	/>
</form>

<style lang="postcss">
	textarea {
		@apply w-full resize-none border-0 bg-transparent font-bold;
	}

	textarea:focus {
		outline: none !important;
		box-shadow: none !important;
	}
</style>
