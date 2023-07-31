<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { genre } from '$lib/configs/genre';
	import { TabGroup, Tab } from '@skeletonlabs/skeleton';

	$: tabSet = $page.params.genre?.toUpperCase() ?? 'ALL';

	function routeToPage(route: string) {
		goto(route, { noScroll: true });
	}
</script>

<div class="mb-6">
	<TabGroup justify="justify-start md:justify-center">
		<Tab
			bind:group={tabSet}
			name="ALL"
			value="ALL"
			on:click={() =>
				routeToPage(`/articles${$page.params.filter ? `/${$page.params.filter}` : '/trending'}`)}
			>ALL</Tab
		>
		{#each genre as genre (genre.title)}
			<Tab
				bind:group={tabSet}
				name={genre.enum}
				value={genre.enum}
				on:click={() =>
					routeToPage(
						`/articles/${$page.params.filter ? `${$page.params.filter}` : 'trending'}/${genre.slug}`
					)}
			>
				{genre.title}
			</Tab>
		{/each}
	</TabGroup>
</div>
