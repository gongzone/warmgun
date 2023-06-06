<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { TabGroup, Tab } from '@skeletonlabs/skeleton';

	$: tabSet = $page.url.pathname;

	function routeToPage(route: string) {
		goto(route, { noScroll: true });
	}
</script>

<TabGroup justify="justify-center">
	<Tab bind:group={tabSet} name="feed" value="/feed" on:click={() => routeToPage('/feed')}>
		마이 피드
	</Tab>
	<Tab bind:group={tabSet} name="like" value="/feed/like" on:click={() => routeToPage('/feed/like')}
		>좋아요한 아티클</Tab
	>
	<Tab
		bind:group={tabSet}
		name="following"
		value="/feed/following"
		on:click={() => routeToPage('/feed/following')}>구독중인 블로거</Tab
	>
</TabGroup>
