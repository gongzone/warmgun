<script lang="ts">
	import { page } from '$app/stores';
	import { AppBar } from '@skeletonlabs/skeleton';
	import HamburgerIcon from '~icons/ri/menu-2-line';
	import GunShotIcon from '~icons/game-icons/gunshot';

	import AvatarPopover from '$components/@ui-blocks/AvatarPopover.svelte';
</script>

<AppBar padding="px-[5vw] py-6">
	<svelte:fragment slot="lead">
		<button class="btn-icon variant-ringed-tertiary">
			<HamburgerIcon />
		</button>
	</svelte:fragment>

	<a href="/" class="inline-flex items-center gap-1 align-middle">
		<GunShotIcon class="w-8 h-8" />
		<h2 class="unstyled font-logo text-3xl hidden md:block">Warmgun</h2>
	</a>

	<svelte:fragment slot="trail">
		{#if !$page.data.user}
			<a href="/auth/login" class="btn variant-filled">로그인</a>
		{:else}
			<AvatarPopover user={$page.data.user} />
		{/if}
	</svelte:fragment>
</AppBar>
