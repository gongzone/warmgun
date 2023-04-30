<script lang="ts">
	import { Drawer, drawerStore } from '@skeletonlabs/skeleton';

	import { DRAFT_SIDEBAR_ID, PUBLISH_SIDEBAR_ID } from './drawer';

	import DraftSidebar from './_DraftSidebar/DraftSidebar.svelte';
	import PublishSidebar from './_PublishSidebar/PublishSidebar.svelte';
</script>

<Drawer>
	{#if $drawerStore.id === DRAFT_SIDEBAR_ID}
		<DraftSidebar />
	{:else if $drawerStore.id === PUBLISH_SIDEBAR_ID}
		<PublishSidebar />
	{/if}
</Drawer>
