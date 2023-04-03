<script lang="ts">
	export let icon: any;
	export let count: number;
	export let iconClass: string = '';
</script>

<div class="flex items-center gap-1">
	<span><svelte:component this={icon} class={iconClass} /></span>
	<span class="text-sm font-thin tracking-wide">{count}</span>
</div>
