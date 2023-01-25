<script lang="ts">
	import type { SubmitFunction } from '@sveltejs/kit';
	import { enhance } from '$app/forms';
	import type { PageData } from './$types';
	import { FileButton } from '@skeletonlabs/skeleton';
	import autosize from 'autosize';
	import { Editor } from 'bytemd';

	import { plugins, editorConfig } from '$lib/editor/editor';
	import { uploadImages } from '$lib/client-fetch/image';

	export let data: PageData;

	let titleTextarea: Element;
	let descriptionTextarea: Element;
	let files: FileList;

	let coverImageUrl: string;
	let title: string;
	let description: string;
	let markdownBody: string;

	$: title = data.draft.title ?? '';
	$: description = data.draft.description ?? '';
	$: markdownBody = data.draft.body ?? '';
	$: titleTextarea ? autosize(titleTextarea) : null;
	$: descriptionTextarea ? autosize(descriptionTextarea) : null;
	$: files &&
		uploadImages(Array.from(files)).then((data) => {
			coverImageUrl = data[0];
		});

	function handleChange(e: any) {
		markdownBody = e.detail.value;
	}

	async function handleUploadImages(markdownImages: File[]) {
		const urls = await uploadImages(markdownImages);
		return urls.map((url) => ({ url }));
	}

	const submitHandler: SubmitFunction = async ({ form, data, action, cancel }) => {
		data.append('coverImage', coverImageUrl);
		data.append('body', markdownBody);
	};
</script>

<!-- UI 리팩토링 -->
<form method="POST" use:enhance={submitHandler}>
	<div class="mb-4">
		<textarea
			class="unstyled h-14 text-3xl w-full resize-none border-0 bg-transparent font-bold focus:!outline-none focus:ring-0"
			name="title"
			placeholder="제목을 입력하세요"
			value={title}
			bind:this={titleTextarea}
		/>
		<textarea
			class="unstyled h-8 text-xl py-0 w-full resize-none border-0 bg-transparent font-bold focus:!outline-none focus:ring-0"
			name="description"
			placeholder="소제목을 입력하세요"
			value={description}
			bind:this={descriptionTextarea}
		/>
	</div>

	<div class="">
		<Editor
			mode="auto"
			uploadImages={handleUploadImages}
			value={markdownBody}
			{editorConfig}
			{plugins}
			on:change={handleChange}
		/>
	</div>
</form>
