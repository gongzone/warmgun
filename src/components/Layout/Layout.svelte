<script lang="ts">
	export let mode: 'default' | 'blog' | 'write' | 'admin' = 'default';
</script>

{#if mode === 'blog'}
	s
{:else}
	s
{/if}
<slot />
