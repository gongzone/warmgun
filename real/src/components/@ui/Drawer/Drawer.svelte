<script lang="ts">
	import { page } from '$app/stores';
	import { Drawer, drawerStore } from '@skeletonlabs/skeleton';

	import { NAV_SIDEBAR_ID, DRAFT_SIDEBAR_ID, PUBLISH_SIDEBAR_ID } from './drawer';

	import NavSidebar from './NavSidebar/NavSidebar.svelte';
	import DraftSidebar from './DraftSidebar/DraftSidebar.svelte';
	import PublishSidebar from './PublishSidebar/PublishSidebar.svelte';

	let publishStorage = new Map();

	$: publishStorageKey = `${$page.url.searchParams.get('mode')}-${$page.params.itemId}`;

	function setPublishStorage(
		e: CustomEvent<{
			coverImage: string | null;
			tags: string[];
			genre: string;
		}>
	) {
		publishStorage.set(publishStorageKey, e.detail);
	}
</script>

<Drawer>
	{#if $drawerStore.id === NAV_SIDEBAR_ID}
		<NavSidebar />
	{:else if $drawerStore.id === DRAFT_SIDEBAR_ID}
		<DraftSidebar />
	{:else if $drawerStore.id === PUBLISH_SIDEBAR_ID}
		<PublishSidebar
			coverImage={publishStorage.get(publishStorageKey)?.coverImage ?? null}
			tags={publishStorage.get(publishStorageKey)?.tags ?? []}
			genre={publishStorage.get(publishStorageKey)?.genre ?? 'ETC'}
			on:close={setPublishStorage}
		/>
	{/if}
</Drawer>
