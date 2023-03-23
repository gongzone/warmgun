<script lang="ts">
	import { TabGroup, Tab } from '@skeletonlabs/skeleton';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';

	const slug = `/${$page.params.page}`;
	let tabSet = $page.url.pathname;

	function routeToPage(route: string) {
		goto(route, { noScroll: true });
	}
</script>

<TabGroup active="variant-filled-surface">
	<Tab
		bind:group={tabSet}
		name="tab1"
		value={slug}
		on:click={() => routeToPage(slug)}
		class="text-sm">글 목록</Tab
	>
</TabGroup>
