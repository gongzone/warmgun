<script lang="ts">
	import ImageIcon from '$components/@icons/ImageIcon.svelte';
	import Image from '$components/@ui/Image.svelte';

	export let slug: string;
	export let coverImage: string | null | undefined;
</script>

<a href={slug}>
	{#if coverImage}
		<div class="w-full h-full rounded-2xl shadow-xl overflow-hidden">
			<Image
				loading="lazy"
				src={`${coverImage}?w=560&h=420&q=80&f=webp`}
				alt="cover"
				class="aspect-[560/420] transition-all duration-500 ease-in-out hover:saturate-150 hover:scale-105"
				width={560}
				height={420}
			/>
		</div>
	{:else}
		<div
			class="flex items-center justify-center aspect-[560/420] rounded-2xl shadow-xl bg-surface-700"
		>
			<ImageIcon class="w-20 h-20" />
		</div>
	{/if}
</a>
