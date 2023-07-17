<script lang="ts">
	import { page } from '$app/stores';
	import { meta } from '$lib/constants/meta';
	import { navs } from '$lib/constants/navs';

	import LogoIcon from '$components/@icons/LogoIcon.svelte';

	$: classesActive = (href: string) => (href === $page.url.pathname ? 'opacity-100' : 'opacity-75');
</script>

<nav class="flex items-center gap-10">
	<a href="/" class="flex items-center gap-2">
		<LogoIcon class="h-6 w-6" />
		<h2 class="hidden font-bold md:block">{meta.title}</h2>
	</a>

	<ul class="hidden md:flex md:items-center md:gap-6">
		{#each navs.mainNav.slice(1, navs.mainNav.length) as nav (nav.title)}
			<li>
				<a
					href={nav.href}
					class="text-sm font-semibold transition-opacity hover:opacity-100 {classesActive(
						nav.href
					)}">{nav.title}</a
				>
			</li>
		{/each}
	</ul>
</nav>
