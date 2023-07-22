<script lang="ts">
	import DefaultHeader from './_DefaultHeader/DefaultHeader.svelte';

	export let mode: 'default' | 'blog' | 'write' | 'admin' = 'default';
</script>

{#if mode === 'default'}
	<DefaultHeader />
{:else if mode === 'blog'}
	s
{/if}
<slot />
