<script lang="ts">
	import type { NavItem } from '$lib/types/nav';

	export let items: NavItem[];
</script>

<nav>
	<ul class="inline-flex flex-col gap-3">
		{#each items as nav (nav.title)}
			<a class="text-surface-300 font-extralight hover:text-token" href={nav.href}>
				<span class="mr-1">᛫</span>
				<span>{nav.title}</span>
			</a>
		{/each}
	</ul>
</nav>
