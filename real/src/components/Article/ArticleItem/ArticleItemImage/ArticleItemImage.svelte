<script lang="ts">
	import ImageIcon from '$components/@icons/ImageIcon.svelte';

	export let slug: string;
	export let coverImage: string | null | undefined;
</script>

<a href={slug}>
	{#if coverImage}
		<img
			src={`${coverImage}?w=560&h=420&q=80&f=webp`}
			alt="cover"
			class="aspect-[560/420] rounded-2xl shadow-xl"
		/>
	{:else}
		<div
			class="flex items-center justify-center aspect-[560/420] rounded-2xl shadow-xl bg-surface-700"
		>
			<ImageIcon class="w-20 h-20" />
		</div>
	{/if}
</a>
