<script lang="ts">
	export let image: string;
	export let bg: string = 'bg-surface-800';
</script>

<div class="relative {bg}">
	<img
		src={image}
		alt="bg-overlay"
		class="absolute top-0 left-0 h-full w-screen opacity-[0.03] object-cover"
	/>
	<slot />
</div>
