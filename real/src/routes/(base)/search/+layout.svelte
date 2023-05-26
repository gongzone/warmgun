<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { TabGroup, Tab } from '@skeletonlabs/skeleton';

	let tabSet: string = '/search';

	$: q = $page.url.searchParams.get('q');

	function routeToPage(route: string) {
		const newRoute = `${route}${q ? `?q=${q}` : ''}`;

		console.log(newRoute);
		goto(newRoute, { noScroll: true });
	}

	function onEnter(e: any) {
		if (e.key === 'Enter' && !!e.target.value) {
			goto(`${$page.url.pathname}?q=${e.target.value}`);
		}
	}
</script>

<div class="container my-20">
	<div class="max-w-[720px] mx-auto">
		<input
			type="search"
			class="input h-16 rounded-md focus:border-tertiary-500"
			placeholder="검색어를 입력하세요"
			on:keypress={onEnter}
		/>
	</div>

	<div class="my-12">
		<TabGroup>
			<Tab
				bind:group={tabSet}
				name="article"
				value="/search"
				on:click={() => routeToPage('/search')}>아티클</Tab
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
	</div>

	<slot />
</div>
