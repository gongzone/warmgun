<script lang="ts">
	import { openNavSidebar } from '$components/@ui/Drawer/drawer';

	import type { CurrentUser } from '$lib/types/user';
	import HamburgerIcon from '$components/@icons/HamburgerIcon.svelte';
	import SearchIcon from '$components/@icons/SearchIcon.svelte';
	import UserPopup from '$components/@ui/Popup/UserPopup.svelte';

	export let user: CurrentUser;
</script>

<header class="sticky top-0 z-40 w-full border-b bg-surface-50-900-token">
	<div class="container h-16 flex items-center justify-between">
		<div class="flex items-center gap-2">
			<button class="btn-icon md:hidden" on:click={() => openNavSidebar()}>
				<HamburgerIcon class="w-5 h-5" />
			</button>
			<!-- <MainNav /> -->
		</div>

		<div class="flex items-center gap-2">
			<a href="/search" class="btn-icon">
				<SearchIcon class="w-5 h-5" />
			</a>
			<UserPopup {user} />
		</div>
	</div>
</header>
