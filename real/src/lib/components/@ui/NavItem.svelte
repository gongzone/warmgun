<script lang="ts">
	import type { SvelteComponent } from 'svelte';

	export let title: string;
	export let href: string;
	export let icon: typeof SvelteComponent | undefined;
</script>

<a {href}>
	{#if icon}
		<span class="badge-icon">
			<svelte:component this={icon} class="w-4 h-4" />
		</span>
	{/if}
	<span class="flex-auto">{title}</span>
</a>
