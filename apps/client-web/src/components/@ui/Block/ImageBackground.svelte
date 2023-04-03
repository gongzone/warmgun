<script lang="ts">
	export let image: string;
	export let alt: string;
	export let bg: string = 'bg-surface-800';

	$: classesBase = `relative ${bg}`;
</script>

<div class={classesBase}>
	<img
		src={image}
		{alt}
		class="absolute top-0 left-0 h-full w-screen opacity-[0.03] object-cover"
	/>
	<slot />
</div>
