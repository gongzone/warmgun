<script lang="ts">
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import Paginator from '$components/@ui/Paginator.svelte';

	export let cursor: number | null;
	export let count: number;

	$: settings = {
		offset: cursor ? cursor : 0,
		limit: 10,
		size: count
	};

	function onPageChange(e: CustomEvent): void {
		const sort = $page.url.searchParams.get('sort');

		if (e.detail === 0) {
			goto($page.url.pathname + `${sort ? `?sort=${sort}` : ''}`);
			return;
		}

		goto(`${$page.url.pathname}?cursor=${e.detail}` + `${sort ? `&sort=${sort}` : ''}`);
	}
</script>

<Paginator
	bind:settings
	showNumerals
	maxNumerals={1}
	justify="justify-center"
	on:page={onPageChange}
/>
