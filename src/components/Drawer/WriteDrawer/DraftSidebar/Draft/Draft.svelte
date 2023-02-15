<script lang="ts">
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { enhance } from '$app/forms';
	import { drawerStore } from '@skeletonlabs/skeleton';
	import { formatDate } from '$lib/utils/date';

	interface Draft {
		id: number | null;
		title: string | null;
		subTitle: string | null;
		updatedAt: Date;
	}

	export let draft: Draft;
</script>

<div class="flex items-center gap-4">
	<button
		type="button"
		class={`unstyled w-full flex flex-col px-6 py-3 space-y-1 rounded-lg bg-surface-700 hover:bg-surface-600 truncate
    ${+$page.params.draftId === draft.id ? '!bg-surface-600 border-2 border-tertiary-500' : ''}`}
		on:click={() => {
			drawerStore.close();
			goto(`/write/draft/${draft.id}`);
		}}
	>
		<div class="text-left w-full">
			<h2 class="unstyled font-bold text-lg truncate">{draft.title || '무제'}</h2>
			<p class="unstyled text-sm truncate">{draft.subTitle || '내용 없음'}</p>
		</div>
		<span class="text-xs self-end">{formatDate(draft.updatedAt)} 저장됨</span>
	</button>

	<form method="POST" use:enhance>
		<button formaction="?/delete" class="btn-icon w-9 h-9 px-0 variant-ringed-tertiary rounded-lg"
			><i class="ri-delete-bin-line ri-lg" />
		</button>
		<input type="hidden" name="draftId" value={draft.id} hidden />
		<input type="hidden" name="currentDraftId" value={+$page.params.draftId} hidden />
	</form>
</div>
