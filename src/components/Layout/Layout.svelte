<script lang="ts">
	import DefaultHeader from './DefaultHeader/DefaultHeader.svelte';
	export let mode: 'default' | 'blog' | 'write' | 'admin' = 'default';
</script>

{#if mode === 'blog'}
	s
{:else}
	<DefaultHeader />
{/if}
<slot />
