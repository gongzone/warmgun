<script lang="ts">
	import { page } from '$app/stores';

	import { defaultLinks } from '$lib/constants/navigation';

	$: classesActive = (href: string) =>
		href === $page.url.pathname ? '!bg-primary-active-token' : '';
</script>

<nav class="list-nav">
	<ul>
		{#each defaultLinks as link (link.name)}
			<li>
				<a href={link.to} class={classesActive(link.to)}>
					<i class={`${link.icon} ri-lg`} />
					<span class="flex-auto">{link.name}</span>
				</a>
			</li>
		{/each}
	</ul>
</nav>
