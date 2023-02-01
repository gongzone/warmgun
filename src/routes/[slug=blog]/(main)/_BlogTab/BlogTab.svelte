<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { writable, type Writable } from 'svelte/store';
	import { TabGroup, Tab } from '@skeletonlabs/skeleton';

	const slug = `/${$page.params.slug}`;
	const tabStore: Writable<string> = writable($page.url.pathname);

	function routeToPage(route: string) {
		goto(route, { noScroll: true });
	}
</script>

<TabGroup selected={tabStore}>
	<Tab tag="a" value={slug} on:click={() => routeToPage(slug)}>전시관</Tab>
	<Tab tag="a" value={`${slug}/articles`} on:click={() => routeToPage(`${slug}/articles`)}
		>아티클</Tab
	>
</TabGroup>
