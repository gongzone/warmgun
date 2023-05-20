<script lang="ts">
	import HamburgerIcon from '$lib/components/@icons/HamburgerIcon.svelte';
	import SearchIcon from '$lib/components/@icons/SearchIcon.svelte';
	import MainNav from './MainNav/MainNav.svelte';
	import UserPopup from './UserPopup/UserPopup.svelte';
</script>

<header class="bg-background sticky top-0 z-40 w-full border-b border-b-surface-600">
	<div class="container h-16 flex items-center justify-between">
		<div class="flex items-center gap-2">
			<button class="btn-icon md:hidden">
				<HamburgerIcon />
			</button>
			<MainNav />
		</div>

		<div class="flex items-center gap-3">
			<a href="/search" class="btn-icon">
				<SearchIcon class="w-6 h-6" />
			</a>
			<UserPopup />
		</div>
	</div>
</header>
