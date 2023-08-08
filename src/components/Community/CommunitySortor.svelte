<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';

	import Sortor from '$components/@ui/Sortor.svelte';

	export let cursor: number | null;

	let items = [
		{ title: '최신순', value: 'recent' },
		{ title: '인기순', value: 'trending' }
	];

	function onSortHandler(e: CustomEvent) {
		if (!cursor) {
			goto(`${$page.url.pathname}?sort=${e.detail}`);
			return;
		}

		goto(`${$page.url.pathname}?cursor=${cursor}&sort=${e.detail}`);
	}
</script>

<Sortor {items} on:sort={onSortHandler} />
