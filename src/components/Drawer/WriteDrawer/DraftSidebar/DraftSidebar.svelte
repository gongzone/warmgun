<script lang="ts">
	import type { LayoutData } from '../../../../routes/write/draft/[draftId]/$types';
	import { enhance } from '$app/forms';
	import { drawerStore, AccordionGroup, AccordionItem } from '@skeletonlabs/skeleton';

	import DraftHeader from './DraftHeader/DraftHeader.svelte';
	import WriterDisplay from './WriterDisplay/WriterDisplay.svelte';
	import Draft from './Draft/Draft.svelte';

	export let writer: LayoutData['writer'];
</script>

<DraftHeader />
<WriterDisplay name={writer.nickname} avatar={writer.avatar} />

<div class="py-8 px-2">
	<AccordionGroup spacing="space-y-0" collapse={false}>
		<AccordionItem open>
			<svelte:fragment slot="lead">
				<i class="ri-draft-line" />
			</svelte:fragment>

			<svelte:fragment slot="summary">
				<span class="font-bold select-none">초고</span>
			</svelte:fragment>

			<svelte:fragment slot="content">
				<ul class="flex flex-col gap-3">
					{#each writer.drafts as draft (draft.id)}
						<li>
							<Draft {draft} />
						</li>
					{/each}
				</ul>
			</svelte:fragment>
		</AccordionItem>
	</AccordionGroup>
</div>

<div class="px-6 mb-10">
	<form
		method="POST"
		use:enhance={() =>
			({ update }) => {
				drawerStore.close();
				update();
			}}
	>
		<button formaction="?/create" class="btn variant-filled-primary w-full">새 초고 만들기</button>
	</form>
</div>
