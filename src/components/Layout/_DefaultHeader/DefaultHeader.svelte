<script lang="ts">
	import UserPopup from '../@UserPopup/UserPopup.svelte';
	import HamburgerButton from './_HamburgerButton.svelte';
	import MainNav from './_MainNav.svelte';
	import SearchLink from './_SearchLink.svelte';
</script>

<header class="sticky top-0 z-30 w-full border-b bg-surface-50-900-token border-b-surface-600">
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
