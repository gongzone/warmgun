<script lang="ts">
	import { Drawer, drawerStore } from '@skeletonlabs/skeleton';

	import { DRAFT_SIDEBAR_ID } from './drawer';

	import DraftSidebar from './_DraftSidebar/DraftSidebar.svelte';
</script>

<Drawer>
	{#if $drawerStore.id === DRAFT_SIDEBAR_ID}
		<DraftSidebar />
	{/if}
</Drawer>
