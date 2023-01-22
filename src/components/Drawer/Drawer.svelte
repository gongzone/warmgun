<script lang="ts">
	import { Drawer, drawerStore } from '@skeletonlabs/skeleton';

	import { drawerIds } from './Drawer';

	import WriteDrawer from './contents/WriteDrawer.svelte';
</script>

<Drawer>
	{#if $drawerStore.id === drawerIds['write']}
		<WriteDrawer />
	{:else if $drawerStore.id === 'example-2'}
		<p>(show 'example-2' contents)</p>
	{:else}
		<p>(fallback contents)</p>
	{/if}
</Drawer>
