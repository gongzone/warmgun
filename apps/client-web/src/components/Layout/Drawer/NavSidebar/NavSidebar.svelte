<script lang="ts">
	import { defaultLinks, communities } from '$lib/constants/nav';
	import NavHeader from './NavHeader/NavHeader.svelte';
	import NavLink from './NavLink/NavLink.svelte';
</script>

<NavHeader />

<div class="px-4 py-6">
	<nav class="list-nav">
		<ul>
			{#each defaultLinks as defaultLink (defaultLink.name)}
				<li>
					<NavLink link={defaultLink} />
				</li>
			{/each}
		</ul>
	</nav>

	<hr class="my-4" />

	<div class="space-y-2">
		<span class="block pl-4 text-sm font-bold text-surface-300">공동체</span>
		<nav class="list-nav">
			<ul>
				{#each communities as community (community.name)}
					<li>
						<NavLink link={community} />
					</li>
				{/each}
			</ul>
		</nav>
	</div>
</div>
