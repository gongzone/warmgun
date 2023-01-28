<script lang="ts">
	import type { LayoutData } from '../../../../routes/write/$types';
	import { AccordionGroup, AccordionItem } from '@skeletonlabs/skeleton';

	import DraftCard from './DraftCard/DraftCard.svelte';
	import DraftDelete from './DraftDelete/DraftDelete.svelte';

	export let drafts: LayoutData['writer']['drafts'];
	export let currentDraftId: number;
</script>

<AccordionGroup spacing="space-y-0" collapse={false}>
	<AccordionItem open>
		<div class="flex items-center" slot="lead"><i class="ri-draft-line" /></div>
		<span class="text-base font-bold select-none" slot="summary">초고</span>

		<nav slot="content">
			<ul class="flex flex-col gap-3">
				{#each drafts as draft (draft.id)}
					<li class="flex gap-4 items-center">
						<DraftCard {draft} {currentDraftId} />
						<DraftDelete draftId={draft.id} {currentDraftId} />
					</li>
				{/each}
			</ul>
		</nav>
	</AccordionItem>
</AccordionGroup>
