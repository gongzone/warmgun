<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { siteConfig } from '$lib/configs/site';
	import { TabGroup, Tab } from '@skeletonlabs/skeleton';

	let tabSet = 'ALL';

	function routeToPage(route: string) {
		goto(route, { noScroll: true });
	}
</script>

<div class="mb-6">
	<TabGroup justify="justify-center">
		<Tab bind:group={tabSet} name="ALL" value="ALL" on:click={() => routeToPage($page.url.pathname)}
			>ALL</Tab
		>
		{#each siteConfig.genre as genre (genre.title)}
			<Tab
				bind:group={tabSet}
				name={genre.enum}
				value={genre.enum}
				on:click={() => routeToPage(`${$page.url.pathname}?genre=${genre.enum.toLowerCase()}`)}
			>
				{genre.title}
			</Tab>
		{/each}
	</TabGroup>
</div>
