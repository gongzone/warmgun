<script lang="ts">
	// import type { LayoutData } from './$types';

	// import { Drawer, drawerStore } from '@skeletonlabs/skeleton';

	// export let data: LayoutData;

	// import { drawers } from './_WriteDrawer/drawer';

	// import DraftSidebar from './_WriteDrawer/DraftSidebar/DraftSidebar.svelte';
	// import PublishSidebar from './_WriteDrawer/PublishSidebar/PublishSidebar.svelte';

	// let coverImageUrl: string;
	// let slugValue: string;

	// $: writer = data.writer;
	// $: currentDraftId = data.currentDraftId;
</script>

<!-- <Drawer>
	{#if $drawerStore.id === drawers['DRAFT'].id && currentDraftId}
		<DraftSidebar {writer} currentDraftId={+currentDraftId} />
	{:else if $drawerStore.id === drawers['PUBLISH'].id}
		<PublishSidebar
			{coverImageUrl}
			{slugValue}
			on:close={(e) => {
				const eventData = e.detail;
				coverImageUrl = eventData.coverImageUrl;
				slugValue = eventData.slugValue;
			}}
		/>
	{/if}
</Drawer> -->

<slot />
