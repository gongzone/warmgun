<script lang="ts">
	import HamburgerButton from './HamburgerButton/HamburgerButton.svelte';
	import SearchLink from './SearchLink/SearchLink.svelte';
	import MainNav from './MainNav/MainNav.svelte';
	import UserPopup from '$components/@ui/Popup/UserPopup.svelte';
</script>

<header class="bg-background sticky top-0 z-40 w-full border-b border-b-surface-600">
	<div class="container h-16 flex items-center justify-between">
		<div class="flex items-center gap-2">
			<HamburgerButton />
			<MainNav />
		</div>

		<div class="flex items-center gap-2">
			<SearchLink />
			<UserPopup />
		</div>
	</div>
</header>
