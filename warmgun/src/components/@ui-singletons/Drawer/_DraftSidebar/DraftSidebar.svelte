<script lang="ts">
	import { page } from '$app/stores';
	import { invalidateAll } from '$app/navigation';
	import { applyAction, enhance } from '$app/forms';
	import { drawerStore, Accordion, AccordionItem, Avatar } from '@skeletonlabs/skeleton';
	import CloseIcon from '~icons/ri/close-line';
	import DraftIcon from '~icons/ri/draft-line';
	import TrashBinIcon from '~icons/ri/delete-bin-line';

	import type { DraftMeta } from '../drawer';
	import { triggerConfirmModal } from '$components/@ui-singletons/Modal/modal';
	import UserAvatar from '$components/@ui-elements/UserAvatar.svelte';
	import DraftCard from './_DraftCard/DraftCard.svelte';

	let deleteForm: HTMLFormElement;

	$: drafts = $drawerStore.meta as DraftMeta;
</script>

{#if !$page.data.user}
	<p>No User Data...</p>
{:else}
	<header class="flex justify-end p-5">
		<button type="button" class="btn-icon btn-ringed-tertiary" on:click={() => drawerStore.close()}>
			<CloseIcon class="w-6 h-6" />
		</button>
	</header>

	<div class="px-2 pb-8 space-y-8">
		<div class="flex flex-col justify-center items-center gap-2">
			<UserAvatar src={$page.data.user.profile.avatar} width="w-24" />
			<span class="text-lg font-bold">{$page.data.user.username}</span>
		</div>

		<Accordion spacing="space-y-0">
			<AccordionItem open>
				<svelte:fragment slot="lead"><DraftIcon /></svelte:fragment>

				<svelte:fragment slot="summary">
					<span class="font-bold select-none">초고</span>
				</svelte:fragment>

				<svelte:fragment slot="content">
					<ul class="flex flex-col gap-3">
						{#each drafts as { id, title, subTitle, updatedAt } (id)}
							<li class="flex items-center gap-4">
								<DraftCard draftId={id} {title} {subTitle} {updatedAt} />
								<form
									method="POST"
									action="?/deleteDraft"
									bind:this={deleteForm}
									use:enhance={() => {
										return async ({ result }) => {
											if (result.type === 'success' || result.type === 'redirect') {
												await invalidateAll();
												drafts = drafts.filter((d) => d.id !== id);
											}
											await applyAction(result);
										};
									}}
								>
									<button
										type="button"
										class="btn-icon w-9 h-9 px-0 variant-ringed-tertiary rounded-lg"
										on:click={() =>
											triggerConfirmModal('초고 삭제', '정말로 삭제하시겠습니까?', (r) => {
												if (r) {
													deleteForm.requestSubmit();
												}
											})}
									>
										<TrashBinIcon />
									</button>
									<input type="hidden" name="draftId" value={id} hidden />
									<input type="hidden" name="currentDraftId" value={$page.params.draftId} hidden />
								</form>
							</li>
						{/each}
					</ul>
				</svelte:fragment>
			</AccordionItem>
		</Accordion>

		<div class="px-6">
			<form
				method="POST"
				action="?/createDraft"
				use:enhance={() => {
					return async ({ result }) => {
						await applyAction(result);
						drawerStore.close();
					};
				}}
			>
				<button type="submit" class="btn variant-filled-primary w-full"> 새 초고 만들기 </button>
			</form>
		</div>
	</div>
{/if}
