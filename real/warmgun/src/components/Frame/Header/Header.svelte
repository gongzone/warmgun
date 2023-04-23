<script lang="ts">
	import { AppBar } from '@skeletonlabs/skeleton';
	import HamburgerIcon from '~icons/ri/menu-2-line';
	import UserIcon from '~icons/ri/user-line';

	import { triggerComponentModal } from '$components/Singleton/Modal/modal';

	import LogoIcon from '$components/@ui-static/LogoIcon.svelte';
	import LogoTitle from '$components/@ui-static/LogoTitle.svelte';
</script>

<AppBar class="relative" slotDefault="flex items-center" padding="px-[5vw] py-6" shadow="shadow-md">
	<svelte:fragment slot="lead">
		<button type="button" class="header-btn-icon">
			<HamburgerIcon />
		</button>
	</svelte:fragment>

	<a class="inline-flex items-center gap-2" href="/">
		<LogoIcon />
		<LogoTitle hidden="md" />
	</a>

	<svelte:fragment slot="trail">
		<button
			type="button"
			class="header-btn-icon"
			on:click={() => triggerComponentModal('AuthModal')}
		>
			<UserIcon />
		</button>
	</svelte:fragment>
</AppBar>

<style lang="postcss">
	.header-btn-icon {
		@apply btn-icon variant-ringed-tertiary ring-[1.5px] md:btn-icon-lg;
	}
</style>
