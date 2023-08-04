<script lang="ts">
	import { siteConfig } from '$lib/configs/site';
	import type { CurrentUser } from '$lib/types/user';

	import SearchIcon from '$components/@icons/SearchIcon.svelte';
	import UserPopup from '$components/@ui/Popup/UserPopup.svelte';
	import LogoIcon from '$components/@icons/LogoIcon.svelte';

	export let user: CurrentUser;
</script>

<header class="sticky top-0 z-30 w-full bg-surface-50-900-token border-b border-b-surface-600">
	<div class="container h-16 flex items-center justify-between">
		<div class="flex items-center gap-2">
			<a href="/" class="flex items-center gap-2">
				<LogoIcon class="h-6 w-6" />
				<h2 class="hidden font-bold md:block">{siteConfig.name}</h2>
			</a>
		</div>

		<div class="flex items-center gap-2">
			<a href="/search" class="btn-icon">
				<SearchIcon class="w-6 h-6" />
			</a>
			<UserPopup {user} />
		</div>
	</div>
</header>
