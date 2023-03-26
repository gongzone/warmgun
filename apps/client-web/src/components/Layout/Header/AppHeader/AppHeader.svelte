<script lang="ts">
	import { AppBar } from '@skeletonlabs/skeleton';

	import HamburgerBtn from './HamburgerBtn/HamburgerBtn.svelte';
	import Logo from './Logo/Logo.svelte';
	import AvatarMenu from '../@AvatarMenu/AvatarMenu.svelte';
</script>

<AppBar
	class="relative"
	slotLead="space-x-1 md:space-x-4"
	padding="px-[5vw] py-6 sm:py-8 md:py-12"
	shadow="shadow-none"
>
	<svelte:fragment slot="lead">
		<HamburgerBtn />
	</svelte:fragment>

	<Logo />

	<svelte:fragment slot="trail">
		<AvatarMenu />
	</svelte:fragment>
</AppBar>
