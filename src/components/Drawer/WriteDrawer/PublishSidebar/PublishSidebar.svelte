<script lang="ts">
	import { createEventDispatcher, onDestroy } from 'svelte';
	import { enhance } from '$app/forms';
	import { drawerStore, FileButton } from '@skeletonlabs/skeleton';

	import { uploadImages } from '$lib/client-fetch/image';

	import PublishHeader from './PublishHeader/PublishHeader.svelte';
	import IconText from './IconText/IconText.svelte';
	import CoverImagePreview from './CoverImagePreview/CoverImagePreview.svelte';

	export let coverImageUrl: string;
	export let slugValue: string;

	const dispatch = createEventDispatcher();

	let files: FileList;
	let isLoading: boolean = false;

	async function uploadCoverImage(files: FileList) {
		isLoading = true;
		const urls = await uploadImages(Array.from(files));
		coverImageUrl = urls[0];
		isLoading = false;
	}

	$: if (files && files.length > 0) {
		uploadCoverImage(files);
	}

	onDestroy(() => {
		dispatch('close', { coverImageUrl, slugValue });
	});
</script>

<form method="POST" use:enhance>
	<PublishHeader />

	<ul class="space-y-12 px-8 py-8 sm:px-12 ">
		<li>
			<IconText text="대표 이미지" />
			<div class="flex flex-col justify-center items-center gap-4">
				<CoverImagePreview url={coverImageUrl} {isLoading} />
				<FileButton bind:files button="variant-filled-secondary"
					>{!coverImageUrl ? '이미지 업로드' : '이미지 수정'}</FileButton
				>
			</div>
		</li>

		<li>
			<IconText text="Slug 설정" />
			<div class="input-group input-group-divider grid-cols-[auto_1fr_auto]">
				<div class="input-group-shim">/</div>
				<input type="text" name="slug" bind:value={slugValue} />
			</div>
		</li>
	</ul>

	<input type="hidden" name="title" value={$drawerStore.meta.title} hidden />
	<input type="hidden" name="subTitle" value={$drawerStore.meta.subTitle} hidden />
	<input type="hidden" name="body" value={$drawerStore.meta.body} hidden />
	<input type="hidden" name="coverImage" value={coverImageUrl} hidden />
</form>
