<script lang="ts">
	import { page } from '$app/stores';

	const navigationData = [
		{
			name: '홈으로',
			icon: 'ri-home-4-line',
			to: '/'
		},
		{
			name: '아티클',
			icon: 'ri-newspaper-line',
			to: '/articles'
		}
	];

	$: classesActive = (href: string) => (href === $page.url.pathname ? '!bg-primary-500/30' : '');
</script>

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
