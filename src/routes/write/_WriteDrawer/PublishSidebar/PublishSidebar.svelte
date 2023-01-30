<script lang="ts">
	import { createEventDispatcher, onDestroy } from 'svelte';
	import { enhance } from '$app/forms';

	import { drawerStore, FileButton } from '@skeletonlabs/skeleton';

	import { uploadImages } from '$lib/client-fetch/image';
	import CoverImagePreview from './CoverImagePreview/CoverImagePreview.svelte';

	export let coverImageUrl: string;
	export let slugValue: string;

	const dispatch = createEventDispatcher();

	let files: FileList;
	let isLoading: boolean = false;

	$: if (files && files.length > 0) {
		uploadCoverImage(files);
	}

	async function uploadCoverImage(files: FileList) {
		isLoading = true;
		const urls = await uploadImages(Array.from(files));
		coverImageUrl = urls[0];
		isLoading = false;
	}

	$: console.log($drawerStore.meta);

	onDestroy(() => {
		dispatch('close', { coverImageUrl, slugValue });
	});
</script>

<form method="POST" use:enhance>
	<div class="flex justify-between px-3 sm:px-5 py-4">
		<button type="button" class="btn btn-ringed-tertiary" on:click={() => drawerStore.close()}>
			<i class="ri-close-line ri-xl" /> 닫기
		</button>
		<button
			type="submit"
			formaction="?/publish"
			class="btn variant-filled-primary"
			on:click={() => drawerStore.close()}
		>
			출간하기
		</button>
	</div>

	<hr />

	<div class="flex flex-col gap-12 px-8 sm:px-12 py-8">
		<div>
			<div class="flex items-center gap-2 mb-4">
				<i class="ri-award-line text-surface-300" />
				<span class="text-base text-surface-300">아티클 대표 이미지</span>
			</div>
			<div class="flex flex-col justify-center items-center gap-4">
				<CoverImagePreview url={coverImageUrl} {isLoading} />
				<FileButton bind:files button="variant-filled-secondary"
					>{!coverImageUrl ? '이미지 추가' : '이미지 수정'}</FileButton
				>
			</div>
		</div>

		<div>
			<div class="flex items-center gap-2 mb-4">
				<i class="ri-award-line text-surface-300" />
				<span class="text-base text-surface-300">Slug 설정</span>
			</div>
			<div class="input-group input-group-divider grid-cols-[auto_1fr_auto]">
				<div class="input-group-shim">/</div>
				<input type="text" name="slug" bind:value={slugValue} />
			</div>
		</div>
	</div>

	<input type="hidden" name="title" value={$drawerStore.meta.title} hidden />
	<input type="hidden" name="description" value={$drawerStore.meta.description} hidden />
	<input type="hidden" name="body" value={$drawerStore.meta.body} hidden />
	<input type="hidden" name="coverImage" value={coverImageUrl} hidden />
</form>
