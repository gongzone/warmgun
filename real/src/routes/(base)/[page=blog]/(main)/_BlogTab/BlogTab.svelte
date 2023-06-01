<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { TabGroup, Tab } from '@skeletonlabs/skeleton';

	let tabSet: string = `/${$page.params.page}`;

	function routeToPage(route: string) {
		goto(route, { noScroll: true });
	}
</script>

<TabGroup>
	<Tab
		bind:group={tabSet}
		name="tab1"
		value="/{$page.params.page}"
		on:click={() => routeToPage(`/${$page.params.page}`)}>아티클</Tab
	>
	<Tab
		bind:group={tabSet}
		name="tab1"
		value="/{$page.params.page}/about"
		on:click={() => routeToPage(`/${$page.params.page}/about`)}>소개</Tab
	>
</TabGroup>
