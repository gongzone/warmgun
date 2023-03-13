<script lang="ts">
	import { ProgressRadial, FileButton } from '@skeletonlabs/skeleton';

	import { CDN_DOMAIN } from '$lib/constants/cdn';
	import { uploadImage } from '$lib/client-fetch/image';

	export let src: string | null = null;

	let isLoading: boolean = false;

	async function onChangeHandler(e: any) {
		isLoading = true;
		const imageUrl = await uploadImage(e.target.files[0]);
		src = imageUrl;
		isLoading = false;
	}

	function onDeleteHandler() {
		src = null;
	}
</script>

<div
	class="flex flex-col justify-center items-center text-center place-content-center card p-4 w-full max-w-[320px] h-[232px]"
>
	{#if !src && !isLoading}
		<i class="ri-image-edit-fill text-9xl" />
		<FileButton
			name="article-cover"
			accept="image/*"
			button="variant-filled-secondary btn-sm"
			on:change={onChangeHandler}
		>
			이미지 업로드
		</FileButton>
	{:else if isLoading}
		<div class="w-20">
			<ProgressRadial stroke={50} meter="stroke-primary-500" />
		</div>
	{:else}
		<div class="relative w-full h-full">
			<img
				src={`${CDN_DOMAIN}/${src}?w=300&h=200&f=webp`}
				class="w-full h-full object-cover"
				alt="cover"
			/>
			<button
				class="absolute top-0 right-0 btn-icon variant-ghost-tertiary rounded-lg"
				on:click={onDeleteHandler}
			>
				<i class="ri-delete-bin-line" />
			</button>
		</div>
	{/if}
</div>
