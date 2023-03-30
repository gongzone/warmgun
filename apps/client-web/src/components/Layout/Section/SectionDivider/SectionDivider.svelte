<script lang="ts">
	export let text: string = '';
	export let icon: any;
</script>

<div class="flex items-center gap-2 bg-surface-800 p-8 my-12 rounded-xl shadow-lg">
	<span><svelte:component this={icon} class="w-7 h-7" /></span>
	<span class="text-2xl font-thin">{text}</span>
</div>
