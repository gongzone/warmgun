<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { createQuery } from '@tanstack/svelte-query';
	import { drawerStore, Accordion, AccordionItem, Avatar } from '@skeletonlabs/skeleton';
	import CloseIcon from '~icons/ri/close-line';
	import DraftIcon from '~icons/ri/draft-line';
	import TrashBinIcon from '~icons/ri/delete-bin-line';

	import { getMe } from '$api/me';
	import { formatDate } from '$lib/utils/format';

	const getMeQuery = createQuery({
		queryKey: ['me'],
		queryFn: getMe
	});
</script>

{#if $getMeQuery.isSuccess && $getMeQuery.data}
	<header class="flex justify-end p-5">
		<button type="button" class="btn-icon btn-ringed-tertiary" on:click={() => drawerStore.close()}>
			<span><CloseIcon class="w-[24px] h-[24px]" /></span>
		</button>
	</header>

	<div class="flex flex-col justify-center items-center gap-2">
		<Avatar src={$getMeQuery.data.profile.avatar} class="w-24" />
		<span class="text-lg font-bold">{$getMeQuery.data.username}</span>
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
						{#each $getMeQuery.data.drafts as draft (draft.id)}
							<li>
								<div class="flex items-center gap-4">
									<button
										type="button"
										class={`unstyled w-full flex flex-col px-6 py-3 space-y-1 rounded-lg bg-surface-700 hover:bg-surface-600 truncate
                        ${
													+$page.params.draftId === draft.id
														? '!bg-surface-600 border-2 border-tertiary-500'
														: ''
												}`}
										on:click={() => {
											drawerStore.close();
											goto(`/write/draft/${draft.id}`);
										}}
									>
										<div class="text-left w-full">
											<h2 class="unstyled font-bold text-lg truncate">{draft.title || '무제'}</h2>
											<p class="unstyled text-sm truncate">{draft.subTitle || '내용없음'}</p>
										</div>
										<span class="text-xs self-end"
											>{formatDate(new Date(draft.updatedAt))} 저장됨</span
										>
									</button>

									<button
										type="button"
										class="btn-icon w-9 h-9 px-0 variant-ringed-tertiary rounded-lg"
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
		<button type="button" class="btn variant-filled-primary w-full">새 초고 만들기</button>
	</div>
{/if}
