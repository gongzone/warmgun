<script lang="ts">
	import type { LayoutData } from '../../../routes/write/draft/[draftId]/$types';
	import { Drawer, drawerStore } from '@skeletonlabs/skeleton';

	import { DRAFT_SIDEBAR, PUBLISH_SIDEBAR } from './drawer';

	import DraftSidebar from './DraftSidebar/DraftSidebar.svelte';
	import PublishSidebar from './PublishSidebar/PublishSidebar.svelte';

	export let writer: LayoutData['writer'] | null = null;

	// URL 변경시 초기화...?
	let coverImageUrl: string;
	let slugValue: string;
</script>

<Drawer>
	{#if $drawerStore.id === DRAFT_SIDEBAR && writer}
		<DraftSidebar {writer} />
	{:else if $drawerStore.id === PUBLISH_SIDEBAR}
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
</Drawer>
