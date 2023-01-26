<script lang="ts">
	import type { LayoutData } from '../$types';
	import type { SubmitFunction } from '@sveltejs/kit';
	import { enhance, applyAction } from '$app/forms';
	import { drawerStore } from '@skeletonlabs/skeleton';

	import WriterDisplay from './WriterDisplay/WriterDisplay.svelte';
	import DraftAccordion from './DraftAccordion/DraftAccordion.svelte';

	export let writer: LayoutData['writer'];
</script>

<div class="flex justify-end p-5">
	<button type="button" class="btn-icon btn-ringed-tertiary" on:click={() => drawerStore.close()}>
		<i class="ri-close-line ri-xl" />
	</button>
</div>

<div class="px-2">
	<WriterDisplay name={writer.name} level={writer.level} avatarUrl={writer.avatarUrl} />
</div>

<div class="py-8 px-2">
	<DraftAccordion drafts={writer.drafts} />
</div>

<div class="px-6">
	<form
		method="POST"
		action="?/create"
		use:enhance={() =>
			({ update }) => {
				drawerStore.close();
				update();
			}}
	>
		<button class="btn variant-filled-primary w-full">새 초고 만들기</button>
	</form>
</div>

<div class="h-10" />
