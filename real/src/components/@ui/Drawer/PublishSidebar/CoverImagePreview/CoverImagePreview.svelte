<script lang="ts">
	import { ProgressRadial, FileButton } from '@skeletonlabs/skeleton';

	import { uploadImage } from '$lib/client-fetch/upload-image';
	import ImageEditIcon from '$components/@icons/ImageEditIcon.svelte';
	import DeleteIcon from '$components/@icons/DeleteIcon.svelte';

	export let coverImage: string | null = null;

	let files: FileList;
	let isLoading: boolean = false;
</script>

<div class="card p-4 w-full max-w-[320px] h-[232px]">
	<div class="relative flex flex-col w-full h-full justify-center items-center">
		{#if coverImage}
			<img
				src={`${coverImage}?w=300&h=200&f=webp`}
				class="w-full h-full object-cover"
				loading="lazy"
				width={300}
				height={200}
				alt="cover"
			/>
			<button
				class="absolute top-0 right-0 btn-icon variant-ghost-tertiary rounded-lg"
				on:click={() => {
					coverImage = null;
				}}
			>
				<DeleteIcon />
			</button>
		{:else if isLoading}
			<ProgressRadial stroke={50} meter="stroke-primary-500" />
		{:else}
			<ImageEditIcon class="w-[90px] h-[90px]" />
			<FileButton
				name="article-cover"
				accept="image/*"
				button="variant-filled-secondary btn-sm"
				bind:files
				on:change={async () => {
					if (!files) return;
					isLoading = true;
					coverImage = await uploadImage(files[0]);
					isLoading = false;
				}}
			>
				이미지 업로드
			</FileButton>
		{/if}
	</div>
</div>
