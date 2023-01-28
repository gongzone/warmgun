<script lang="ts">
	import type { LayoutData } from './$types';

	import { Drawer, drawerStore } from '@skeletonlabs/skeleton';

	export let data: LayoutData;

	import { drawers } from './_WriteDrawer/drawer';

	import DraftSidebar from './_WriteDrawer/DraftSidebar/DraftSidebar.svelte';
	import PublishSidebar from './_WriteDrawer/PublishSidebar/PublishSidebar.svelte';

	let coverImageUrl: string;

	$: writer = data.writer;
	$: currentDraftId = data.currentDraftId;

	function setCoverImageUrl(event: any) {
		coverImageUrl = event.detail;
		console.log(coverImageUrl);
	}
</script>

<Drawer>
	{#if $drawerStore.id === drawers['DRAFT'].id && currentDraftId}
		<DraftSidebar {writer} currentDraftId={+currentDraftId} />
	{:else if $drawerStore.id === drawers['PUBLISH'].id}
		<PublishSidebar {coverImageUrl} on:uploadSuccess={setCoverImageUrl} />
	{/if}
</Drawer>

<slot />
