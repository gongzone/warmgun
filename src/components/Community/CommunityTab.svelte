<script lang="ts">
	import { page } from '$app/stores';
	import { TabGroup, TabAnchor } from '@skeletonlabs/skeleton';

	import { navs } from '$lib/constants/navs';

	export let sort: string | null;

	function tabHref(href: string) {
		const added = sort ? `?sort=${sort}` : '';
		return href + added;
	}
</script>

<div class="space-y-2">
	<TabGroup justify="justify-center">
		{#each navs.community as community (community.title)}
			<TabAnchor href={tabHref(community.href)} selected={$page.url.pathname === community.href}>
				<span>{community.title}</span>
			</TabAnchor>
		{/each}
	</TabGroup>
</div>
