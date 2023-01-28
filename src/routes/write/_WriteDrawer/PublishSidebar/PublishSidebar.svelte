<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { FileButton } from '@skeletonlabs/skeleton';

	import { uploadImages } from '$lib/client-fetch/image';
	import CoverImagePreview from './CoverImagePreview/CoverImagePreview.svelte';

	export let coverImageUrl: string;

	const dispatch = createEventDispatcher();

	let files: FileList;
	let uploadLoading: boolean = false;

	$: files ? uploadCoverImage(files) : null;

	async function uploadCoverImage(files: FileList) {
		uploadLoading = true;
		const urls = await uploadImages(Array.from(files));
		dispatch('uploadSuccess', urls[0]);
		coverImageUrl = urls[0];
		uploadLoading = false;
	}
</script>

<div class="p-5">
	<div class="flex flex-col items-center">
		{#if uploadLoading}
			<p>업로드 중...</p>
		{:else}
			<CoverImagePreview url={coverImageUrl} />
		{/if}

		<FileButton bind:files button="variant-filled-secondary">커버 이미지 업로드</FileButton>
	</div>
</div>
