<script lang="ts">
	import { AppBar } from '@skeletonlabs/skeleton';
	import HamburgerIcon from '~icons/ri/menu-2-line';

	import { openNavSidebar } from '$components/@event/@singleton/Drawer/drawer';

	import MainLogo from './MainLogo/MainLogo.svelte';
	import AvatarMenu from '../@AvatarMenu/AvatarMenu.svelte';
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

	<MainLogo name="Warmgun" description="개발 커뮤니티 & 블로그 서비스" />

	<svelte:fragment slot="trail">
		<AvatarMenu />
	</svelte:fragment>
</AppBar>
