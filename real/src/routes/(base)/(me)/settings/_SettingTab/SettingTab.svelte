<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { TabGroup, Tab } from '@skeletonlabs/skeleton';

	$: tabSet = $page.url.pathname;

	function routeToPage(route: string) {
		goto(route, { noScroll: true });
	}
</script>

<TabGroup>
	<Tab
		bind:group={tabSet}
		name="settings-profile"
		value="/settings"
		on:click={() => routeToPage('/settings')}
	>
		프로필
	</Tab>
	<Tab
		bind:group={tabSet}
		name="settings-blog"
		value="/settings/blog"
		on:click={() => routeToPage('/settings/blog')}>블로그</Tab
	>
	<Tab
		bind:group={tabSet}
		name="settings-account"
		value="/settings/account"
		on:click={() => routeToPage('/settings/account')}>계정</Tab
	>
</TabGroup>
