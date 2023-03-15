<script lang="ts">
	import { AppBar } from '@skeletonlabs/skeleton';
	import { createQuery } from '@tanstack/svelte-query';
	import HamburgerIcon from '~icons/ri/menu-2-line';
	import PistolGunIcon from '~icons/game-icons/pistol-gun';

	import { getMe } from '$api/me';
	import AnonymousPopup from '../_Popup/AnonymousPopup.svelte';
	import AuthenticatedPopup from '../_Popup/AuthenticatedPopup.svelte';

	const getMeQuery = createQuery({
		queryKey: ['me'],
		queryFn: getMe
	});
</script>

<AppBar
	class="relative"
	slotLead="space-x-1 md:space-x-4"
	shadow="shadow-none"
	padding="px-[5vw] py-6 sm:py-8 md:py-12"
>
	<svelte:fragment slot="lead">
		<button class="btn-icon variant-ringed-tertiary ring-[1.5px] md:btn-icon-lg">
			<span>
				<HamburgerIcon />
			</span>
		</button>
	</svelte:fragment>

	<a href="/" class="unstyled">
		<div class="flex items-center gap-1 md:gap-2">
			<PistolGunIcon class="w-[42px] h-[42px] md:w-[58px] md:h-[58px]" />
			<div class="hidden sm:block">
				<h2 class="!font-logo text-2xl md:text-4xl">Warmgun</h2>
				<span>개발 커뮤니티 & 블로그 서비스</span>
			</div>
		</div>
	</a>

	<svelte:fragment slot="trail">
		{#if $getMeQuery.isSuccess}
			<AuthenticatedPopup user={$getMeQuery.data} />
		{:else}
			<AnonymousPopup />
		{/if}
	</svelte:fragment>
</AppBar>
