<script lang="ts">
	import { page } from '$app/stores';

	import { meta } from '$lib/constants/meta';
	import { navs } from '$lib/constants/navs';
	import { cn } from '$lib/utils/cn';
	import { classesActive } from '$lib/utils/utils';

	import { CommonIcons } from '$components/@icons/common';
	import { openNavDrawer } from '$components/Layout/_NavDrawer/NavDrawer.svelte';
	import UserPopup from '../@UserPopup/UserPopup.svelte';
</script>

<header class="sticky top-0 z-30 w-full border-b bg-surface-50-900-token border-b-surface-600">
	<div class="container h-16 flex items-center justify-between">
		<div class="flex items-center gap-2">
			<button class="btn-icon md:hidden" on:click={() => openNavDrawer()}>
				<CommonIcons.Hamburger class="w-5 h-5" />
			</button>

			<nav class="flex items-center gap-10">
				<a href="/" class="flex items-center gap-2">
					<CommonIcons.Logo class="h-6 w-6" />
					<h2 class="hidden font-bold md:block">{meta.title}</h2>
				</a>

				<ul class="hidden md:flex md:items-center md:gap-6">
					{#each navs.mainNav.slice(1) as nav (nav.title)}
						<li>
							<a
								href={nav.href}
								class={cn(
									'text-sm font-semibold transition-opacity opacity-75 hover:opacity-100',
									classesActive($page.url.pathname, nav.href, 'opacity-100')
								)}
								>{nav.title}
							</a>
						</li>
					{/each}
				</ul>
			</nav>
		</div>

		<div class="flex items-center gap-2">
			<a href="/search" class="btn-icon">
				<CommonIcons.Search class="w-5 h-5" />
			</a>
			<UserPopup />
		</div>
	</div>
</header>
