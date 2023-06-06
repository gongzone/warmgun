<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { TabGroup, Tab } from '@skeletonlabs/skeleton';

	export let q: string = '';

	$: tabSet = $page.url.pathname;

	function routeToPage(route: string) {
		const newRoute = `${route}${q ? `?q=${q}` : ''}`;
		goto(newRoute, { noScroll: true });
	}
</script>

<TabGroup>
	<Tab bind:group={tabSet} name="article" value="/search" on:click={() => routeToPage('/search')}
		>아티클</Tab
	>
	<Tab
		bind:group={tabSet}
		name="tag"
		value="/search/tags"
		on:click={() => routeToPage('/search/tags')}>태그</Tab
	>
	<Tab
		bind:group={tabSet}
		name="bloger"
		value="/search/users"
		on:click={() => routeToPage('/search/users')}>블로거</Tab
	>
</TabGroup>
