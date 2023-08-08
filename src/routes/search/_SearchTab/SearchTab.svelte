<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { TabGroup, Tab } from '@skeletonlabs/skeleton';

	export let q: string = '';

	$: tabSet = $page.url.pathname;

	const routeToPage = (route: string) => {
		goto(`${route}${q ? `?q=${q}` : ''}`, { noScroll: true });
	};
</script>

<TabGroup justify="justify-center">
	<Tab bind:group={tabSet} name="articles" value="/search" on:click={() => routeToPage('/search')}>
		아티클
	</Tab>
	<Tab
		bind:group={tabSet}
		name="tags"
		value="/search/tags"
		on:click={() => routeToPage('/search/tags')}
	>
		태그
	</Tab>
	<Tab
		bind:group={tabSet}
		name="users"
		value="/search/users"
		on:click={() => routeToPage('/search/users')}
	>
		블로거
	</Tab>
</TabGroup>
