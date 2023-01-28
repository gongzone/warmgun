<script lang="ts">
	import type { LayoutData } from '../../$types';
	import { enhance } from '$app/forms';
	import { drawerStore, AccordionGroup, AccordionItem } from '@skeletonlabs/skeleton';

	import WriterDisplay from './WriterDisplay/WriterDisplay.svelte';

	import DraftCard from './DraftCard/DraftCard.svelte';

	export let writer: LayoutData['writer'];
	export let currentDraftId: number;
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
	<AccordionGroup spacing="space-y-0" collapse={false}>
		<AccordionItem open>
			<div class="flex items-center" slot="lead"><i class="ri-draft-line" /></div>
			<span class="text-base font-bold select-none" slot="summary">초고</span>

			<nav slot="content">
				<ul class="flex flex-col gap-3">
					{#each writer.drafts as draft (draft.id)}
						<li class="flex gap-4 items-center">
							<DraftCard {draft} {currentDraftId} />
							<form method="POST" use:enhance>
								<button
									formaction="?/delete"
									class="btn-icon w-9 h-9 px-0 variant-ringed-tertiary rounded-lg"
									><i class="ri-delete-bin-line ri-lg" /></button
								>
								<input type="hidden" name="draftId" value={draft.id} hidden />
								<input type="hidden" name="currentDraftId" value={currentDraftId} hidden />
							</form>
						</li>
					{/each}
				</ul>
			</nav>
		</AccordionItem>
	</AccordionGroup>
</div>

<div class="px-6">
	<form
		method="POST"
		use:enhance={() =>
			({ update }) => {
				drawerStore.close();
				update();
			}}
	>
		<button formaction="?/create" class="btn variant-filled-primary w-full">새 초고 만들기</button>
	</form>
</div>

<div class="h-10" />
