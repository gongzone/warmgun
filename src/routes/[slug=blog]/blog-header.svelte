<script lang="ts">
	import type { LayoutData } from './$types';
	import { AppBar } from '@skeletonlabs/skeleton';

	import type { CurrentUser } from '$lib/types/current-user';

	import MainLogo from '$components/@svg/main-logo.svelte';
	import UserAvatar from '$components/user-avatar.svelte';

	export let user: CurrentUser;
	const userMenu = 'user-menu';
</script>

<AppBar padding="px-[5vw] py-1">
	<svelte:fragment slot="lead">
		<a class="flex items-center" href="/">
			<MainLogo />
			<h2 class="font-logo text-3xl md:text-4xl">DevWarriors</h2>
		</a>
	</svelte:fragment>

	<svelte:fragment slot="trail">
		<UserAvatar {user} />
	</svelte:fragment>
</AppBar>
