<script lang="ts">
	export let src: string;
	export let alt: string;
	export let loading: 'eager' | 'lazy' | null | undefined = undefined;

	let isLoadFinished: boolean = false;
</script>

<figure class="relative w-full h-full {!isLoadFinished ? 'placeholder animate-pulse' : ''}">
	<img
		{loading}
		{src}
		{alt}
		{...$$restProps}
		on:load={() => {
			isLoadFinished = true;
		}}
	/>
</figure>
