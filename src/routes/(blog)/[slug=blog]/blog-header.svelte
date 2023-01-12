<script lang="ts">
	import type { LayoutData } from './$types';
	import { AppBar } from '@skeletonlabs/skeleton';

	import MainLogo from '$components/@svg/main-logo.svelte';
</script>

<AppBar padding="px-[5vw] py-1">
	<svelte:fragment slot="lead">
		<a class="flex items-center" href="/">
			<MainLogo />
			<h2 class="font-logo text-3xl md:text-4xl">DevWarriors</h2>
		</a>
	</svelte:fragment>
</AppBar>
