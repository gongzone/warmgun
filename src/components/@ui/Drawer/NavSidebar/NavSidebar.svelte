<script lang="ts">
	import { drawerStore } from '@skeletonlabs/skeleton';

	import { navs } from '$lib/configs/nav';

	import LogoIcon from '$components/@icons/LogoIcon.svelte';
	import CloseIcon from '$components/@icons/CloseIcon.svelte';
	import Navigation from '$components/@ui/Navigation.svelte';
</script>

<header class="flex justify-between items-center border-b border-b-surface-600 p-3">
	<a href="/" class="flex items-center gap-2 ml-3" on:click={() => drawerStore.close()}>
		<LogoIcon class="w-6 h-6" />
		<h2 class="font-bold">Warmgun</h2>
	</a>

	<button class="btn-icon" on:click={() => drawerStore.close()}>
		<CloseIcon class="w-6 h-6" />
	</button>
</header>

<div class="px-3 py-6">
	<Navigation items={navs.mainNav} on:click={() => drawerStore.close()} />
</div>
