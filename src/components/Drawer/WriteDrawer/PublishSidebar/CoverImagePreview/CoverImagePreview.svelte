<script lang="ts">
	import { ProgressRadial, FileButton } from '@skeletonlabs/skeleton';

	import { CDN_DOMAIN } from '$lib/constants/cdn';
	import { uploadImage } from '$lib/client-fetch/image';

	export let src: string | null = null;

	let files: FileList;
</script>

<div class="flex flex-col justify-center items-center card p-4 w-full max-w-[320px] h-[232px]">
	{#if !src}
		<i class="ri-image-edit-fill text-9xl" />
		<FileButton
			bind:files
			on:change={async () => {
				const imageUrl = await uploadImage(files[0], { imageFor: 'article-cover' });
				src = imageUrl;
			}}
			accept="image/*"
			button="variant-filled-secondary btn-sm"
		>
			이미지 업로드
		</FileButton>
	{:else if src}
		<div class="relative w-full h-full">
			<img src={`${CDN_DOMAIN}/${src}`} class="w-full h-full object-cover" alt="cover" />
		</div>
	{/if}
	<!-- 
	{#if isLoading}
		<div class="w-20">
			<ProgressRadial stroke={50} meter="stroke-primary-500" />
		</div>
	{/if}

	{#if url && !isLoading}
		<div class="relative w-full h-full">
			<img src={url} class="w-full h-full object-cover" alt="cover" />
		</div>
	{/if} -->
</div>
