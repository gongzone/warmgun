<script lang="ts">
	import { siteConfig } from '$lib/configs/site';

	import LogoIcon from '$components/@icons/LogoIcon.svelte';
</script>

<nav class="flex items-center gap-10">
	<a href="/" class="flex items-center gap-2">
		<LogoIcon class="h-6 w-6" />
		<h2 class="hidden font-bold md:block">{siteConfig.name}</h2>
	</a>

	<ul class="hidden md:flex md:gap-6">
		{#each siteConfig.mainNav.slice(1, siteConfig.mainNav.length) as link (link.href)}
			<li class="text-sm font-semibold opacity-75">
				<a href={link.href}>{link.title}</a>
			</li>
		{/each}
	</ul>
</nav>
