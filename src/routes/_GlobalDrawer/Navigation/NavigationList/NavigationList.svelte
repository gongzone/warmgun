<script lang="ts">
	import { page } from '$app/stores';

	import { communities } from '$lib/constants/community';

	const navigationData = [
		{
			name: '홈으로',
			icon: 'ri-home-4-line',
			to: '/'
		},
		{
			name: '실시간',
			icon: 'ri-newspaper-line',
			to: '/articles'
		},
		{
			name: '나의 피드',
			icon: 'ri-newspaper-line',
			to: '/articles'
		}
	];

	$: classesActive = (href: string) => (href === $page.url.pathname ? '!bg-primary-500/30' : '');
</script>

<div class="space-y-6">
	<nav class="list-nav">
		<ul>
			{#each navigationData as nav (nav.name)}
				<li>
					<a href={nav.to} class={classesActive(nav.to)}>
						<i class={`${nav.icon} ri-lg`} />
						<span class="flex-auto">{nav.name}</span>
					</a>
				</li>
			{/each}
		</ul>
	</nav>

	<nav class="list-nav">
		<span>공동체</span>
		<ul>
			{#each communities as community (community.name)}
				<li>
					<a href={community.to} class={classesActive(community.to)}>
						<span class="flex-auto font-logo">{community.name}</span>
					</a>
				</li>
			{/each}
		</ul>
	</nav>
</div>
