<script lang="ts">
	import { page } from '$app/stores';
	import { Avatar, AccordionGroup, AccordionItem } from '@skeletonlabs/skeleton';

	import type { CurrentUser } from '$lib/types/current-user';
	import { allAvatars } from '$lib/character/avatar';
	import { drawerClose } from '$components/Drawer/Drawer';

	let user: CurrentUser;

	$: user = $page.data.user;
</script>

<div class="flex justify-end p-5">
	<button class="btn-icon btn-ringed-tertiary" on:click={drawerClose}>
		<i class="ri-close-line ri-xl" />
	</button>
</div>

{#if user && user.character}
	<div class="px-8">
		<div class="flex flex-col justify-center items-center gap-3">
			<div class="relative inline-block">
				<span class="badge badge-filled-primary absolute -top-1 -right-1 z-10"
					>Lv {user.character.level}</span
				>

				<Avatar width="w-24" src={allAvatars[user.character.mainAvatar].url} />
			</div>
			<div class="">
				<span class="text-lg font-bold">{user.character.name}</span>
			</div>
		</div>
	</div>

	<div class="py-8 px-2">
		<AccordionGroup spacing="space-y-0" collapse={false}>
			<!-- Open -->
			<AccordionItem open>
				<svelte:fragment slot="lead"
					><div class="flex items-center"><i class="ri-draft-line" /></div></svelte:fragment
				>
				<svelte:fragment slot="summary"
					><span class="text-base font-bold">초고</span></svelte:fragment
				>
				<svelte:fragment slot="content">
					<nav class="">
						<ul class="flex flex-col gap-3">
							{#each user.drafts as draft, index (draft.id)}
								<li>
									<a
										class="unstyled flex flex-col items-start px-6 py-3 bg-surface-800 rounded-lg hover:bg-secondary-800"
										href={`/write/draft/${draft.id}`}
									>
										<span class="">{draft.title ?? `무제 - ${index + 1}`}</span>
										<span class="text-sm">{draft.description ?? '내용 없음'}</span>
										<span class="text-xs self-end"
											>{draft.updatedAt.getFullYear() +
												'년 ' +
												draft.updatedAt.getMonth() +
												1 +
												'월 ' +
												draft.updatedAt.getDate() +
												'일 ' +
												'저장됨'}</span
										>
									</a>
								</li>
							{/each}
							<li>
								<a
									class="unstyled flex flex-col items-start px-6 py-2 bg-surface-800 rounded-lg"
									href={`/`}
								>
									<span class="">dsafasf</span>
									<span class="text-sm">내용 없음</span>
								</a>
							</li>
						</ul>
					</nav>
				</svelte:fragment>
			</AccordionItem>
			<!-- Closed -->
			<AccordionItem open>
				<svelte:fragment slot="lead"
					><div class="flex items-center"><i class="ri-book-3-line" /></div></svelte:fragment
				>
				<svelte:fragment slot="summary"
					><span class="text-base font-bold">출간작</span></svelte:fragment
				>
				<svelte:fragment slot="content">(content)</svelte:fragment>
			</AccordionItem>
		</AccordionGroup>
	</div>
{/if}
