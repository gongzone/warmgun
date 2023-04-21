<script lang="ts">
	import { drawerStore } from '@skeletonlabs/skeleton';
	import PistolGunIcon from '~icons/game-icons/pistol-gun';
	import CloseIcon from '~icons/ri/close-line';

	import { defaultLinks } from '$lib/constants/nav';
	import NavLink from './NavLink/NavLink.svelte';
</script>

<header class="flex justify-between items-center border-b border-b-surface-500 px-3 py-3">
	<a href="/" class="unstyled" on:click={() => drawerStore.close()}>
		<div class="flex items-center gap-2">
			<PistolGunIcon class="w-[40px] h-[40px]" />
			<h2 class="unstyled font-logo text-xl">Warmgun</h2>
		</div>
	</a>

	<button class="btn-icon" on:click={() => drawerStore.close()}>
		<span><CloseIcon class="w-[32px] h-[32px]" /></span>
	</button>
</header>

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
</div>
