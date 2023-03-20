<script lang="ts">
	import { Drawer, drawerStore } from '@skeletonlabs/skeleton';

	import NavSidebar from './_NavSidebar/NavSidebar.svelte';
	import DraftSidebar from './_DraftSidebar/DraftSidebar.svelte';
	import PublishSidebar from './_PublishSidebar/PublishSidebar.svelte';

	let coverImage: string | null = null;
	let slug: string = '';
</script>

<Drawer>
	{#if $drawerStore.id === 'nav-sidebar'}
		<NavSidebar />
	{:else if $drawerStore.id === 'draft-sidebar'}
		<DraftSidebar />
	{:else if $drawerStore.id === 'publish-sidebar'}
		<PublishSidebar bind:coverImage bind:slug />
	{/if}
</Drawer>
