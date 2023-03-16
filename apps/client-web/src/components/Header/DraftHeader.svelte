<script lang="ts">
	import { AppBar } from '@skeletonlabs/skeleton';
	import BackIcon from '~icons/ri/arrow-left-line';
	import DraftIcon from '~icons/ri/article-line';

	import { openDraftSidebar } from '$components/Drawer/drawer';
</script>

<AppBar padding="p-4 sm:p-5" slotLead="space-x-1 md:space-x-2" background="bg-transparent">
	<svelte:fragment slot="lead">
		<button class="btn-icon" on:click={() => history.back()}>
			<span><BackIcon class="w-[24px] h-[24px]" /></span>
		</button>
		<button
			type="button"
			class="btn-icon btn-icon-lg variant-ghost-surface"
			on:click={() => openDraftSidebar()}
		>
			<span><DraftIcon class="w-[24px] h-[24px]" /></span>
		</button>
	</svelte:fragment>

	<svelte:fragment slot="trail">
		<button type="button" class="btn variant-filled-secondary">저장</button>
		<button type="button" class="btn variant-filled-primary" on:click={() => {}}>글 등록</button>
	</svelte:fragment>
</AppBar>
