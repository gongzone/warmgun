<script context="module" lang="ts">
	import { writable } from 'svelte/store';

	let isOpen = writable(false);

	export function openDraftDrawer() {
		isOpen.set(true);
	}

	export function closeDrafDrawer() {
		isOpen.set(false);
	}
</script>

<script lang="ts">
	import Drawer from '$components/@ui/Drawer.svelte';
	import { sineIn } from 'svelte/easing';
	import CloseIcon from '$components/@icons/CloseIcon.svelte';
	import { page } from '$app/stores';
	import UserAvatar from '$components/@ui/UserAvatar.svelte';
	import NoDataCard from '$components/@ui/NoDataCard.svelte';
	import { enhance } from '$app/forms';
	import { Accordion, AccordionItem } from '@skeletonlabs/skeleton';
	import DraftIcon from '$components/@icons/DraftIcon.svelte';
	import { triggerConfirmModal } from '$components/@ui/Modal/modal';
	import DeleteIcon from '$components/@icons/DeleteIcon.svelte';
	import { formatDate } from '$lib/utils/format';

	let deleteForms: HTMLFormElement[] = [];

	let transitionParams = {
		x: -320,
		duration: 200,
		easing: sineIn
	};

	$: activeClass = (draftId: number) =>
		+$page.params.itemId === draftId ? '!bg-surface-50 !text-surface-900' : '';
</script>

<Drawer
	transitionType="fly"
	{transitionParams}
	bind:isOpen={$isOpen}
	id="sidebar1"
	width="w-[360px]"
>
	<header class="flex justify-end p-5">
		<button type="button" class="btn-icon btn-ringed-tertiary" on:click={() => closeDrafDrawer()}>
			<CloseIcon class="w-6 h-6" />
		</button>
	</header>

	<div class="px-2 pb-8 space-y-8">
		{#if $page.data.user}
			<div class="flex flex-col justify-center items-center gap-2">
				<UserAvatar src={$page.data.user.profile?.avatar} width="w-24" />
				<span class="text-lg font-bold">{$page.data.user.username}</span>
			</div>
		{:else}
			<NoDataCard text="유저 데이터가 존재하지 않습니다." />
		{/if}

		<div class="space-y-8">
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
									<a
										href={`/write/${draft.id}?mode=draft`}
										class="w-full truncate border border-surface-600 px-3 py-2 rounded-md hover:bg-surface-700 {activeClass(
											draft.id
										)}"
										on:click={() => closeDrafDrawer()}
									>
										<div class="flex flex-col gap-1">
											<h2 class="font-semibold truncate">{draft.title || '무제'}</h2>
											<span class="text-xs self-end">{formatDate(draft.updatedAt)} 저장됨</span>
										</div>
									</a>
									<form
										method="POST"
										action="?/deleteDraft"
										bind:this={deleteForms[draft.id]}
										use:enhance
									>
										<input type="hidden" name="draftId" value={draft.id} />
										<button
											type="button"
											class="btn-icon btn-icon-sm variant-ringed-tertiary rounded-lg"
											on:click={() =>
												triggerConfirmModal('초고 삭제', '정말로 삭제하시겠습니까?', (confirm) => {
													if (confirm) deleteForms[draft.id].requestSubmit();
												})}
										>
											<DeleteIcon class="w-4 h-4" />
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
						if (!(result.type === 'failure')) closeDrafDrawer();
						update();
					};
				}}
			>
				<button type="submit" class="btn variant-filled-primary w-full">새 초고 만들기</button>
			</form>
		</div>
	</div>
</Drawer>
