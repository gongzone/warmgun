<script lang="ts">
	import { page } from '$app/stores';
	import { enhance } from '$app/forms';
	import { Accordion, AccordionItem } from '@skeletonlabs/skeleton';

	import { triggerConfirmModal } from '$components/@ui/Modal/modal';

	import DraftIcon from '$components/@icons/DraftIcon.svelte';
	import DeleteIcon from '$components/@icons/DeleteIcon.svelte';
	import DraftItem from './DraftItem/DraftItem.svelte';
	import NoDataCard from '$components/@ui/NoDataCard.svelte';

	let deleteForms: HTMLFormElement[] = [];
</script>

{#if $page.data.drafts}
	<Accordion>
		<AccordionItem open>
			<svelte:fragment slot="lead"><DraftIcon /></svelte:fragment>
			<svelte:fragment slot="summary"
				><span class="font-bold select-none">초고</span></svelte:fragment
			>
			<svelte:fragment slot="content">
				<ul class="flex flex-col gap-3">
					{#each $page.data.drafts as draft (draft.id)}
						<li class="flex items-center gap-4">
							<DraftItem {draft} />
							<form
								method="POST"
								action="?/deleteDraft"
								bind:this={deleteForms[draft.id]}
								use:enhance
							>
								<input type="hidden" name="draftId" value={draft.id} />
								<button
									type="button"
									class="btn-icon variant-ringed-tertiary rounded-lg"
									on:click={() =>
										triggerConfirmModal('초고 삭제', '정말로 삭제하시겠습니까?', (confirm) => {
											if (confirm) deleteForms[draft.id].requestSubmit();
										})}
								>
									<DeleteIcon />
								</button>
							</form>
						</li>
					{/each}
				</ul>
			</svelte:fragment>
		</AccordionItem>
	</Accordion>
{:else}
	<NoDataCard text="초고 데이터가 존재하지 않습니다." />
{/if}
