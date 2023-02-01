<script lang="ts">
	import { Drawer, drawerStore } from '@skeletonlabs/skeleton';

	import { NAVIGATION_ID } from './drawer';

	import Navigation from './Navigation/Navigation.svelte';
</script>

<Drawer>
	{#if $drawerStore.id === NAVIGATION_ID}
		<Navigation />
	{:else}
		<p>(fallback contents)</p>
	{/if}
</Drawer>
