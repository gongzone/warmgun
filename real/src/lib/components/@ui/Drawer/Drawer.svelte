<script lang="ts">
	import { page } from '$app/stores';
	import { Drawer, drawerStore } from '@skeletonlabs/skeleton';

	import { DRAFT_SIDEBAR_ID, PUBLISH_SIDEBAR_ID } from './drawer';

	import DraftSidebar from './DraftSidebar/DraftSidebar.svelte';
	import PublishSidebar from './PublishSidebar/PublishSidebar.svelte';

	let publishStorage = new Map();

	$: publishStorageKey = `${$page.url.searchParams.get('mode')}-${$page.params.itemId}`;

	function setPublishStorage(
		e: CustomEvent<{
			coverImage: string | null;
			tags: string[];
		}>
	) {
		publishStorage.set(publishStorageKey, e.detail);
	}
</script>

<Drawer>
	{#if $drawerStore.id === DRAFT_SIDEBAR_ID}
		<DraftSidebar />
	{:else if $drawerStore.id === PUBLISH_SIDEBAR_ID}
		<PublishSidebar
			coverImage={publishStorage.get(publishStorageKey)?.coverImage ?? null}
			tags={publishStorage.get(publishStorageKey)?.tags ?? []}
			on:close={setPublishStorage}
		/>
	{/if}
</Drawer>
