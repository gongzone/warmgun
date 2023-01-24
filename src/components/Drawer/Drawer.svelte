<script lang="ts">
	import { Drawer, drawerStore } from '@skeletonlabs/skeleton';

	import { drawerIds } from './Drawer';

	import WriteSidebar from './Sidebar/WriteSidebar/WriteSidebar.svelte';
</script>

<Drawer>
	{#if $drawerStore.id === drawerIds['write']}
		<WriteSidebar />
	{:else if $drawerStore.id === 'example-2'}
		<p>(show 'example-2' contents)</p>
	{:else}
		<p>(fallback contents)</p>
	{/if}
</Drawer>
