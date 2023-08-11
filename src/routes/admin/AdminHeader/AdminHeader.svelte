<script lang="ts">
	import { page } from '$app/stores';
	import { AppShell, AppBar, AppRail, AppRailTile, AppRailAnchor } from '@skeletonlabs/skeleton';

	import ArrowLeftIcon from '$components/@icons/ArrowLeftIcon.svelte';
</script>

<AppBar slotDefault="space-x-2">
	<svelte:fragment slot="lead">
		<a href="/" class="btn-icon variant-filled">
			<ArrowLeftIcon />
		</a>
	</svelte:fragment>

	<span class="text-lg font-bold">Warmgun 관리자 페이지</span>
	<span>-</span>
	<span class="text-lg font-bold">{$page.data.user?.profile?.nickname}님 환영합니다</span>

	<svelte:fragment slot="trail" />
</AppBar>
