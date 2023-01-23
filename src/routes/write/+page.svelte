<script lang="ts">
	import type { SubmitFunction } from '@sveltejs/kit';
	import { enhance } from '$app/forms';
	import { FileButton } from '@skeletonlabs/skeleton';
	import autosize from 'autosize';
	import { Editor } from 'bytemd';

	import { plugins, editorConfig } from '$lib/editor/editor';
	import { uploadImages } from '$lib/client-fetch/image';

	let titleTextarea: Element;
	let descriptionTextarea: Element;
	let files: FileList;

	let coverImageUrl: string;
	let markdownBody: string;

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
	<!-- <div class="flex justify-end p-5">
				<FileButton bind:files button="btn-icon btn-filled-secondary" title="커버 이미지"
					><i class="ri-image-add-line ri-lg" /></FileButton
				>
			</div> -->

	<div class="mb-4">
		<textarea
			class="unstyled h-14 text-3xl"
			name="title"
			placeholder="제목을 입력하세요"
			bind:this={titleTextarea}
		/>
		<textarea
			class="unstyled h-8 text-xl py-0"
			name="description"
			placeholder="소제목을 입력하세요"
			bind:this={descriptionTextarea}
		/>
	</div>

	<div class="">
		<Editor
			mode="auto"
			uploadImages={handleUploadImages}
			value={markdownBody}
			placeholder="내용을 입력하세요"
			{editorConfig}
			{plugins}
			on:change={handleChange}
		/>
	</div>
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
