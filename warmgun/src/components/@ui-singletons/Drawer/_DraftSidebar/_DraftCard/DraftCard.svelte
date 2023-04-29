<script lang="ts">
	import { page } from '$app/stores';
	import { drawerStore } from '@skeletonlabs/skeleton';

	import { formatDate } from '$lib/utils/format';

	export let draftId: number;
	export let title: string;
	export let subTitle: string;
	export let updatedAt: Date;

	$: activeClasses =
		+$page.params.draftId === draftId ? '!bg-surface-600 border-2 border-surface-300' : '';
</script>

<a
	href={`/write/draft/${draftId}`}
	class="unstyled w-full px-6 py-3 bg-surface-700 rounded-lg hover:bg-surface-600 truncate {activeClasses}"
	on:click={() => {
		drawerStore.close();
	}}
>
	<div class="flex flex-col gap-1">
		<h2 class="unstyled font-bold text-lg truncate">{title || '무제'}</h2>
		<p class="unstyled text-sm truncate">{subTitle || '내용없음'}</p>
		<span class="text-xs self-end">{formatDate(updatedAt)} 저장됨</span>
	</div>
</a>
