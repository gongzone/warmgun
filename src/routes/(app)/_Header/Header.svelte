<script lang="ts">
	import { AppBar } from '@skeletonlabs/skeleton';

	import Logo from './Logo/Logo.svelte';
	import MobileNav from './MobileNav/MobileNav.svelte';
	import AvatarMenu from './AvatarMenu/AvatarMenu.svelte';
</script>

<AppBar background="bg-transparent" shadow="shadow-none" padding="px-[5vw] py-9 md:py-12">
	<svelte:fragment slot="lead">
		<Logo />
	</svelte:fragment>

	<svelte:fragment slot="trail">
		<MobileNav />
		<AvatarMenu />
	</svelte:fragment>
</AppBar>
