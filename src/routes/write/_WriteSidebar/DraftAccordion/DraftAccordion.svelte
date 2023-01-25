<script lang="ts">
	import type { LayoutData } from '../../$types';
	import { page } from '$app/stores';
	import { AccordionGroup, AccordionItem } from '@skeletonlabs/skeleton';

	import DraftCard from './DraftCard/DraftCard.svelte';

	let writer: LayoutData['writer'];

	$: writer = $page.data.writer;
	$: currentDraftId = +$page.params.draftId;
</script>

<AccordionGroup spacing="space-y-0" collapse={false}>
	<AccordionItem open>
		<div class="flex items-center" slot="lead"><i class="ri-draft-line" /></div>

		<span class="text-base font-bold select-none" slot="summary">초고</span>

		<nav slot="content">
			{#if writer.drafts}
				<ul class="flex flex-col gap-3">
					{#each writer.drafts as draft (draft.id)}
						<li>
							<DraftCard {draft} {currentDraftId} />
						</li>
					{/each}
				</ul>
			{/if}
		</nav>
	</AccordionItem>
</AccordionGroup>
