<script lang="ts">
	export let text: string = '';
	export let icon: any;
</script>

<div class="my-12 flex items-center gap-2 rounded-xl bg-surface-800 p-8 shadow-lg">
	<span>
		<svelte:component this={icon} class="h-7 w-7" />
	</span>
	<span class="text-2xl font-thin">{text}</span>
</div>
