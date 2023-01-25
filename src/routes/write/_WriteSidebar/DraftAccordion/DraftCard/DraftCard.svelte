<script lang="ts">
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	import { drawerStore } from '@skeletonlabs/skeleton';
	import { formatDate } from '$lib/utils/date';

	interface Draft {
		id: number | null;
		title: string | null;
		description: string | null;
		updatedAt: Date;
	}

	export let draft: Draft;
	export let currentDraftId: number;

	$: id = draft.id;
	$: title = draft.title ?? '무제';
	$: description = draft.description ?? '내용 없음';
	$: formattedDate = formatDate(draft.updatedAt);
</script>

<div class="flex gap-4 items-center">
	<button
		class={`unstyled w-full flex flex-col items-start px-6 py-3 rounded-lg hover:bg-surface-500
    ${currentDraftId === id ? 'bg-surface-500' : 'bg-surface-900'}`}
		on:click={() => {
			drawerStore.close();
			goto(`/write/draft/${id}`);
		}}
	>
		<div class="flex w-full items-center justify-between">
			<span>{title}</span>
		</div>
		<span class="text-sm">{description}</span>
		<span class="text-xs self-end">{formattedDate} 저장됨</span>
	</button>

	<div>
		<form method="POST" action="/write/draft?/delete" use:enhance>
			<input type="hidden" name="currentDraftId" value={currentDraftId} hidden />
			<input type="hidden" name="draftId" value={id} hidden />
			<button class="btn-icon w-9 h-9 px-0 variant-ringed-tertiary rounded-lg"
				><i class="ri-delete-bin-line ri-lg" /></button
			>
		</form>
	</div>
</div>
