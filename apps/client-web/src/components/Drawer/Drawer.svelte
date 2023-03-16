<script lang="ts">
	import { Drawer, drawerStore } from '@skeletonlabs/skeleton';

	import NavSidebar from './_NavSidebar/NavSidebar.svelte';
	import DraftSidebar from './_DraftSidebar/DraftSidebar.svelte';
</script>

<Drawer>
	{#if $drawerStore.id === 'nav-sidebar'}
		<NavSidebar />
	{:else if $drawerStore.id === 'draft-sidebar'}
		<DraftSidebar />
	{/if}
</Drawer>
