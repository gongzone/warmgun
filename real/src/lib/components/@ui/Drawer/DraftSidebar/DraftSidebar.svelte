<script lang="ts">
	import { page } from '$app/stores';
	import { invalidateAll } from '$app/navigation';
	import { applyAction, enhance } from '$app/forms';
	import { drawerStore, Accordion, AccordionItem, Avatar } from '@skeletonlabs/skeleton';
	import CloseIcon from '$lib/components/@icons/CloseIcon.svelte';
	import DraftIcon from '$lib/components/@icons/DraftIcon.svelte';
	import DeleteIcon from '$lib/components/@icons/DeleteIcon.svelte';

	import UserAvatar from '$lib/components/@ui/UserAvatar.svelte';
	import Draft from './Draft/Draft.svelte';
	import { triggerConfirmModal } from '../../Modal/modal';

	let deleteForms: HTMLFormElement[] = [];
</script>

{#if !$page.data.user || !$page.data.drafts}
	<p>No Data...</p>
{:else}
	<header class="flex justify-end p-5">
		<button type="button" class="btn-icon btn-ringed-tertiary" on:click={() => drawerStore.close()}>
			<CloseIcon class="w-6 h-6" />
		</button>
	</header>

	<div class="px-5 pb-8 space-y-8">
		<div class="flex flex-col justify-center items-center gap-2">
			<UserAvatar src={$page.data.user.profile?.avatar} width="w-24" />
			<span class="text-lg font-bold">{$page.data.user.username}</span>
		</div>

		<div class="space-y-8">
			<Accordion>
				<AccordionItem open>
					<svelte:fragment slot="lead"><DraftIcon /></svelte:fragment>
					<svelte:fragment slot="summary"
						><span class="font-bold select-none">초고</span></svelte:fragment
					>
					<svelte:fragment slot="content">
						<ul class="flex flex-col gap-3">
							{#each $page.data.drafts as { id, title, updatedAt } (id)}
								<li class="flex items-center gap-4">
									<Draft {id} {title} {updatedAt} />
									<form
										method="POST"
										action="?/deleteDraft"
										bind:this={deleteForms[id]}
										use:enhance
									>
										<input type="hidden" name="draftId" value={id} />
										<button
											type="button"
											class="btn-icon btn-icon-lg variant-ringed-tertiary rounded-lg"
											on:click={() =>
												triggerConfirmModal('초고 삭제', '정말로 삭제하시겠습니까?', (confirm) => {
													if (confirm) deleteForms[id].requestSubmit();
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

			<form
				method="POST"
				action="?/createDraft"
				class="px-4"
				use:enhance={() => {
					return async ({ result, update }) => {
						if (!(result.type === 'failure')) drawerStore.close();
						update();
					};
				}}
			>
				<button type="submit" class="btn variant-filled-primary w-full">새 초고 만들기</button>
			</form>
		</div>
	</div>
{/if}
