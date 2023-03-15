<script lang="ts">
	import { Drawer, drawerStore } from '@skeletonlabs/skeleton';

	import NavSidebar from './_NavSidebar/NavSidebar.svelte';
</script>

<Drawer>
	{#if $drawerStore.id === 'nav-sidebar'}
		<NavSidebar />
	{:else}
		(fallback)
	{/if}
</Drawer>
