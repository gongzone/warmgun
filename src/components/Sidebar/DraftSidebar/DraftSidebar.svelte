<script lang="ts">
	import type { LayoutData } from '../../../routes/write/$types';
	import { enhance } from '$app/forms';
	import { drawerStore } from '@skeletonlabs/skeleton';

	import WriterDisplay from './WriterDisplay/WriterDisplay.svelte';
	import DraftAccordion from './DraftAccordion/DraftAccordion.svelte';

	let writer: LayoutData['writer'] = $drawerStore.meta.writer;
	let currentDraftId: number = $drawerStore.meta.currentDraftId;
</script>

<!-- Form Actions: Draft(create / delete) -->
<form
	method="POST"
	use:enhance={() =>
		({ update }) => {
			drawerStore.close();
			update();
		}}
>
	<div class="flex justify-end p-5">
		<button type="button" class="btn-icon btn-ringed-tertiary" on:click={() => drawerStore.close()}>
			<i class="ri-close-line ri-xl" />
		</button>
	</div>

	<div class="px-2">
		<WriterDisplay name={writer.name} level={writer.level} avatarUrl={writer.avatarUrl} />
	</div>

	<div class="py-8 px-2">
		<DraftAccordion drafts={writer.drafts} {currentDraftId} />
	</div>

	<div class="px-6">
		<button formaction="?/create" class="btn variant-filled-primary w-full">새 초고 만들기</button>
	</div>
</form>

<div class="h-10" />
