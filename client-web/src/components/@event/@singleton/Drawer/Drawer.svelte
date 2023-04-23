<script lang="ts">
	import { Drawer, drawerStore } from '@skeletonlabs/skeleton';

	import { NAV_SIDEBAR, DRAFT_SIDEBAR, PUBLISH_SIDEBAR } from './drawer';
	import NavSidebar from './NavSidebar/NavSidebar.svelte';
	import DraftSidebar from './DraftSidebar/DraftSidebar.svelte';
	import PublishSidebar from './PublishSidebar/PublishSidebar.svelte';

	let coverImage: string | null = null;
	let slug: string = '';
	let tags: string[] = [];
</script>

<Drawer>
	{#if $drawerStore.id === NAV_SIDEBAR}
		<NavSidebar />
	{:else if $drawerStore.id === DRAFT_SIDEBAR}
		<DraftSidebar />
	{:else if $drawerStore.id === PUBLISH_SIDEBAR}
		<PublishSidebar bind:coverImage bind:slug bind:tags />
	{/if}
</Drawer>
