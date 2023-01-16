<script lang="ts">
	import { AppBar } from '@skeletonlabs/skeleton';

	import type { CurrentUser } from '$lib/types/current-user';

	import MainLogo from '$components/@svg/main-logo.svelte';
	import Hamburger from '$components/@svg/hamburger.svelte';
	import UserAvatar from '$components/user-avatar.svelte';

	export let user: CurrentUser = null;
</script>

<AppBar padding="px-[5vw] py-9 md:py-12">
	<svelte:fragment slot="lead">
		<a href="/">
			<div class="flex items-center gap-1">
				<MainLogo />
				<div>
					<h2 class="font-logo text-3xl md:text-4xl">DevWarriors</h2>
					<span class="hidden md:block">개발 커뮤니티 & 블로그 서비스</span>
				</div>
			</div>
		</a>
	</svelte:fragment>

	<svelte:fragment slot="trail">
		<button
			class="btn-icon btn-ringed w-12 px-0 ring-[1.5px] dark:ring-zinc-500 hover:dark:ring-gray-400"
		>
			<Hamburger />
		</button>

		<UserAvatar {user} />
	</svelte:fragment>
</AppBar>
