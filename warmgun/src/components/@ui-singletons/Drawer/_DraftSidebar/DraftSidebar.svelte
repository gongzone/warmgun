<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { drawerStore, Accordion, AccordionItem, Avatar } from '@skeletonlabs/skeleton';
	import CloseIcon from '~icons/ri/close-line';
	import DraftIcon from '~icons/ri/draft-line';
	import TrashBinIcon from '~icons/ri/delete-bin-line';

	import type { DraftMeta } from '../drawer';
	import UserAvatar from '$components/@ui-elements/UserAvatar.svelte';

	$: drafts = $drawerStore.meta as DraftMeta;
</script>

{#if !$page.data.user}
	<p>No User Data...</p>
{:else}
	<header class="flex justify-end p-5">
		<button type="button" class="btn-icon btn-ringed-tertiary" on:click={() => drawerStore.close()}>
			<span><CloseIcon class="w-[24px] h-[24px]" /></span>
		</button>
	</header>

	<div class="flex flex-col justify-center items-center gap-2">
		<UserAvatar src={$page.data.user.profile.avatar} width="w-24" />
		<span class="text-lg font-bold">{$page.data.user.username}</span>
	</div>

	<div class="py-8 px-2">
		<Accordion spacing="space-y-0">
			<AccordionItem open>
				<svelte:fragment slot="lead">
					<span><DraftIcon /></span>
				</svelte:fragment>

				<svelte:fragment slot="summary">
					<span class="font-bold select-none">초고</span>
				</svelte:fragment>

				<svelte:fragment slot="content">
					<ul class="flex flex-col gap-3">
						{#each drafts as draft (draft.id)}
							<li>
								<div class="flex items-center gap-4">
									<a
										href={`/write/draft/${draft.id}`}
										class={`unstyled w-full flex flex-col px-6 py-3 space-y-1 rounded-lg bg-surface-700 hover:bg-surface-600 truncate
                        ${
													+$page.params.draftId === draft.id
														? '!bg-surface-600 border-2 border-tertiary-500'
														: ''
												}`}
										on:click={() => {
											drawerStore.close();
										}}
									>
										<div class="text-left w-full">
											<h2 class="unstyled font-bold text-lg truncate">{draft.title || '무제'}</h2>
											<p class="unstyled text-sm truncate">{draft.subTitle || '내용없음'}</p>
										</div>
										<span class="text-xs self-end">{draft.updatedAt} 저장됨</span>
									</a>

									<button
										type="button"
										class="btn-icon w-9 h-9 px-0 variant-ringed-tertiary rounded-lg"
										on:click={() => {}}
										><TrashBinIcon />
									</button>
								</div>
							</li>
						{/each}
					</ul>
				</svelte:fragment>
			</AccordionItem>
		</Accordion>
	</div>

	<div class="px-6 mb-10">
		<button type="button" class="btn variant-filled-primary w-full" on:click={() => {}}
			>새 초고 만들기</button
		>
	</div>
{/if}
