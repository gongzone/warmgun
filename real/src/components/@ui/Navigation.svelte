<script lang="ts">
	import { page } from '$app/stores';
	import type { NavItem } from '$lib/types/nav';

	export let items: NavItem[];

	$: classesActive = (href: string) =>
		href === $page.url.pathname ? '!bg-primary-600 !text-surface-900' : '';
</script>

<nav class="list-nav">
	<ul>
		{#each items as item (item.title)}
			<li>
				<a href={item.href} class={classesActive(item.href)} on:click>
					{#if item.icon}
						<span class="badge-icon">
							<svelte:component this={item.icon} class="w-6 h-6" />
						</span>
					{/if}
					<span class="flex-auto">{item.title}</span>
				</a>
			</li>
		{/each}
	</ul>
</nav>
