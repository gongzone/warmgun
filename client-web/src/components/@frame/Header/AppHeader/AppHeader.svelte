<script lang="ts">
	import { AppBar } from '@skeletonlabs/skeleton';
	import HamburgerIcon from '~icons/ri/menu-2-line';
	import PistolGunIcon from '~icons/game-icons/pistol-gun';

	import { openNavSidebar } from '$components/@event/@singleton/Drawer/drawer';
	import AvatarMenu from '$components/@event/Menu/AvatarMenu/AvatarMenu.svelte';
</script>

<AppBar
	class="relative"
	slotLead="space-x-1 md:space-x-4"
	padding="px-[5vw] py-6 sm:py-8 md:py-12"
	shadow="shadow-none"
>
	<svelte:fragment slot="lead">
		<button
			class="btn-icon variant-ringed-tertiary ring-[1.5px] md:btn-icon-lg"
			on:click={openNavSidebar}
		>
			<span><HamburgerIcon /></span>
		</button>
	</svelte:fragment>

	<a href="/" class="unstyled inline-block">
		<div class="flex items-center gap-2">
			<PistolGunIcon class="w-[42px] h-[42px] md:w-[58px] md:h-[58px]" />

			<div class="hidden sm:block">
				<h2 class="unstyled font-logo text-2xl md:text-4xl">Warmgun</h2>
				<span>개발 커뮤니티 & 블로그 서비스</span>
			</div>
		</div>
	</a>

	<svelte:fragment slot="trail">
		<AvatarMenu />
	</svelte:fragment>
</AppBar>
