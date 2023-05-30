<script lang="ts">
	import { page } from '$app/stores';
	import { drawerStore } from '@skeletonlabs/skeleton';

	import { formatDate } from '$lib/utils/format';
	import type { Draft } from '$lib/types/draft';

	export let draft: Draft;

	$: activeClass =
		+$page.params.itemId === draft.id ? '!bg-surface-600 border-2 border-surface-300' : '';
</script>

<a
	href={`/write/${draft.id}?mode=draft`}
	class="w-full px-6 py-3 bg-surface-700 rounded-lg hover:bg-surface-600 truncate {activeClass}"
	on:click={() => drawerStore.close()}
>
	<div class="flex flex-col gap-1">
		<h2 class="font-bold text-lg truncate">{draft.title || '무제'}</h2>
		<span class="text-xs self-end">{formatDate(draft.updatedAt)} 저장됨</span>
	</div>
</a>
