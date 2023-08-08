<script lang="ts">
	import { page } from '$app/stores';
	import type { Nav } from '$lib/constants/navs';

	export let items: Nav[];

	$: classesActive = (href: string) =>
		href === $page.url.pathname ? '!bg-primary-700 !text-surface-900' : '';
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

		{#if $$slots.subItems}
			<hr class="my-2" />
			<slot name="subItems" />
		{/if}
	</ul>
</nav>
