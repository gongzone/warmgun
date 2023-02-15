<script lang="ts">
	import { Drawer, drawerStore } from '@skeletonlabs/skeleton';

	import { NAV_SIDEBAR } from './drawer';

	import NavSidebar from './NavSidebar/NavSidebar.svelte';
</script>

<Drawer>
	{#if $drawerStore.id === NAV_SIDEBAR}
		<NavSidebar />
	{:else}
		<p>(fallback contents)</p>
	{/if}
</Drawer>
