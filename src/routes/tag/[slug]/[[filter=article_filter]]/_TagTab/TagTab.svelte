<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { TabGroup, Tab } from '@skeletonlabs/skeleton';

	$: tabSet = decodeURI($page.url.pathname);

	const routeToPage = (route: string) => {
		goto(route, { noScroll: true });
	};
</script>

<TabGroup>
	<Tab
		bind:group={tabSet}
		name="tags-trending"
		value="/tags/{$page.params.slug}"
		on:click={() => routeToPage(`/tags/${$page.params.slug}`)}
	>
		트렌딩
	</Tab>
	<Tab
		bind:group={tabSet}
		name="tags-recent"
		value="/tags/{$page.params.slug}/recent"
		on:click={() => routeToPage(`/tags/${$page.params.slug}/recent`)}
	>
		최신
	</Tab>
	<Tab
		bind:group={tabSet}
		name="tags-best"
		value="/tags/{$page.params.slug}/best"
		on:click={() => routeToPage(`/tags/${$page.params.slug}/best`)}
	>
		베스트
	</Tab>
</TabGroup>
