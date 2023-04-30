<script lang="ts">
	import { ProgressRadial, FileButton } from '@skeletonlabs/skeleton';
	import EditIcon from '~icons/ri/image-edit-fill';
	import DeleteBinIcon from '~icons/ri/delete-bin-line';

	import { uploadImage } from '$api/image';
	import { createMutation } from '@tanstack/svelte-query';

	export let coverImage: string | null = null;

	const uploadImageMutation = createMutation({
		mutationFn: (file: File) => uploadImage(file),
		onSuccess: (imageUrl) => {
			coverImage = `${imageUrl}`;
		}
	});

	const onImageChangeHandler = (e: any) => {
		$uploadImageMutation.mutate(e.target.files[0]);
	};
</script>

<div
	class="flex flex-col justify-center items-center text-center place-content-center card p-4 w-full max-w-[320px] h-[232px]"
>
	{#if coverImage}
		<div class="relative w-full h-full">
			<img
				src={`${coverImage}?w=300&h=200&f=webp`}
				class="w-full h-full object-cover"
				alt="cover"
			/>
			<button
				class="absolute top-0 right-0 btn-icon variant-ghost-tertiary rounded-lg"
				on:click={() => {
					coverImage = null;
				}}
			>
				<span><DeleteBinIcon /></span>
			</button>
		</div>
	{:else if $uploadImageMutation.isLoading}
		<ProgressRadial stroke={50} meter="stroke-primary-500" />
	{:else}
		<span><EditIcon class="w-[90px] h-[90px]" /></span>
		<FileButton
			name="article-cover"
			accept="image/*"
			button="variant-filled-secondary btn-sm"
			on:change={onImageChangeHandler}
		>
			이미지 업로드
		</FileButton>
	{/if}
</div>
