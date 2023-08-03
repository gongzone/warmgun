<script context="module" lang="ts">
	export type LayoutMode = 'default' | 'write';
</script>

<script lang="ts">
	import DefaultFooter from './_DefaultFooter/DefaultFooter.svelte';
	import DefaultHeader from './_DefaultHeader/DefaultHeader.svelte';
	import NavDrawer from './_NavDrawer/NavDrawer.svelte';

	export let mode: LayoutMode = 'default';
</script>

<NavDrawer />

{#if mode === 'default'}
	<DefaultHeader />
{/if}

<slot />

{#if mode === 'default'}
	<DefaultFooter />
{/if}
