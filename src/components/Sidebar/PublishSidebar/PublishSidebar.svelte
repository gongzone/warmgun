<script lang="ts">
	import { FileButton } from '@skeletonlabs/skeleton';

	import { uploadImages } from '$lib/client-fetch/image';

	import CoverImagePreview from './CoverImagePreview/CoverImagePreview.svelte';

	let files: FileList;
	let promiseCover: Promise<string> | null;

	async function uploadCoverImage(files: FileList) {
		const urls = await uploadImages(Array.from(files));
		return urls[0];
	}

	$: promiseCover = files ? uploadCoverImage(files) : null;
</script>

<div class="p-5">
	<div class="flex flex-col items-center">
		<CoverImagePreview {promiseCover} />
		<FileButton bind:files button="variant-filled-secondary">커버 이미지 업로드</FileButton>
	</div>
</div>
