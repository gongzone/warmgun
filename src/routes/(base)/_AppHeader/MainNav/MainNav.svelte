<script lang="ts">
	import { page } from '$app/stores';
	import { metaDefaults } from '$lib/configs/meta';
	import { navs } from '$lib/configs/nav';

	import LogoIcon from '$components/@icons/LogoIcon.svelte';

	$: classesActive = (href: string) =>
		href === $page.url.pathname ? '!text-primary-600' : 'opacity-75';
</script>

<nav class="flex items-center gap-10">
	<a href="/" class="flex items-center gap-2">
		<LogoIcon class="h-6 w-6" />
		<h2 class="hidden font-bold md:block">{metaDefaults.title}</h2>
	</a>

	<ul class="hidden md:flex md:items-center md:gap-6">
		{#each navs.mainNav.slice(1, navs.mainNav.length) as nav (nav.title)}
			<li>
				<a href={nav.href} class="text-sm font-semibold {classesActive(nav.href)}">{nav.title}</a>
			</li>
		{/each}
	</ul>
</nav>
