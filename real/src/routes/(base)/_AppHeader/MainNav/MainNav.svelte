<script lang="ts">
	import { page } from '$app/stores';
	import { siteConfig } from '$lib/configs/site';

	import LogoIcon from '$components/@icons/LogoIcon.svelte';

	$: classesActive = (href: string) =>
		href === $page.url.pathname ? '!text-primary-600' : 'opacity-75';
</script>

<nav class="flex items-center gap-10">
	<a href="/" class="flex items-center gap-2">
		<LogoIcon class="h-6 w-6" />
		<h2 class="hidden font-bold md:block">{siteConfig.name}</h2>
	</a>

	<ul class="hidden md:flex md:items-center md:gap-6">
		{#each siteConfig.mainNav.slice(1, siteConfig.mainNav.length) as nav (nav.href)}
			<li class="text-sm font-semibold">
				<a href={nav.href} class={classesActive(nav.href)}>{nav.title}</a>
			</li>
		{/each}
	</ul>
</nav>
