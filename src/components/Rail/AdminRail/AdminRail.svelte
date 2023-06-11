<script lang="ts">
	import { page } from '$app/stores';
	import { AppRail, AppRailAnchor } from '@skeletonlabs/skeleton';

	import HomeIcon from '$components/@icons/HomeIcon.svelte';
	import SearchIcon from '$components/@icons/SearchIcon.svelte';
</script>

<AppRail>
	<svelte:fragment slot="lead">
		<AppRailAnchor
			href="/admin"
			regionLead="flex justify-center"
			selected={$page.url.pathname === '/admin'}
		>
			<svelte:fragment slot="lead">
				<HomeIcon class="w-5 h-5" />
			</svelte:fragment>
		</AppRailAnchor>
	</svelte:fragment>

	<AppRailAnchor
		href="/admin/search"
		title="검색"
		regionLead="flex justify-center"
		selected={$page.url.pathname === '/admin/search'}
	>
		<svelte:fragment slot="lead">
			<SearchIcon class="w-5 h-5" />
		</svelte:fragment>
		<span>검색</span>
	</AppRailAnchor>
</AppRail>
