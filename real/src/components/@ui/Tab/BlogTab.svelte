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
		active="variant-filled-secondary"
		rounded="rounded-lg"
		border=""
		padding="px-4 py-4"
		class="text-xl font-bold"
		on:click={() => routeToPage(`/${$page.params.page}`)}>Home</Tab
	>
</TabGroup>
