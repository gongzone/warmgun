<script lang="ts">
	import { TabGroup, Tab } from '@skeletonlabs/skeleton';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';

	const slug = `/${$page.params.slug}`;
	let tabSet = $page.url.pathname;

	function routeToPage(route: string) {
		goto(route, { noScroll: true });
	}
</script>

<TabGroup>
	<Tab bind:group={tabSet} name="tab1" value={slug} on:click={() => routeToPage(slug)}>아티클</Tab>
</TabGroup>
