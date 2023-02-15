<script lang="ts">
	import { ProgressRadial } from '@skeletonlabs/skeleton';

	export let url: string;
	export let isLoading: boolean;
</script>

<div class="flex items-center justify-center card p-4 w-full max-w-[320px] h-[232px]">
	{#if !url && !isLoading}
		<i class="ri-image-edit-fill ri-9x" />
	{/if}

	{#if isLoading}
		<div class="w-20">
			<ProgressRadial stroke={50} meter="stroke-primary-500" />
		</div>
	{/if}

	{#if url && !isLoading}
		<div class="relative w-full h-full">
			<img src={url} class="w-full h-full object-cover" alt="cover" />
		</div>
	{/if}
</div>
