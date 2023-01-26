<script lang="ts">
	import type { LayoutData } from '../../$types';
	import { page } from '$app/stores';
	import { AccordionGroup, AccordionItem } from '@skeletonlabs/skeleton';

	import DraftCard from './DraftCard/DraftCard.svelte';

	export let drafts: LayoutData['writer']['drafts'];

	$: currentDraftId = +$page.params.draftId;
</script>

<AccordionGroup spacing="space-y-0" collapse={false}>
	<AccordionItem open>
		<div class="flex items-center" slot="lead"><i class="ri-draft-line" /></div>

		<span class="text-base font-bold select-none" slot="summary">초고</span>

		<nav slot="content">
			<ul class="flex flex-col gap-3">
				{#each drafts as draft (draft.id)}
					<li>
						<DraftCard {draft} {currentDraftId} />
					</li>
				{/each}
			</ul>
		</nav>
	</AccordionItem>
</AccordionGroup>
