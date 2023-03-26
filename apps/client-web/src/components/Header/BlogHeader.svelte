<script lang="ts">
	import { getMe, getMyDrafts } from '$api/me';
	import { AppBar } from '@skeletonlabs/skeleton';
	import { createQuery } from '@tanstack/svelte-query';
	import PistolGunIcon from '~icons/game-icons/pistol-gun';

	import AnonymousPopup from './_Popup/AnonymousPopup.svelte';
	import AuthenticatedPopup from './_Popup/AuthenticatedPopup.svelte';

	const getMeQuery = createQuery({
		queryKey: ['me'],
		queryFn: getMe
	});

	const getMyDraftsQuery = createQuery({
		queryKey: ['myDrafts'],
		queryFn: getMyDrafts
	});
</script>

<AppBar
	background="bg-transparent"
	border="border-b border-surface-500"
	padding="px-4 py-2 md:px-8"
>
	<svelte:fragment slot="lead">
		<a href="/">
			<PistolGunIcon class="w-[42px] h-[42px] md:w-[52px] md:h-[52px]" />
		</a>
	</svelte:fragment>

	<svelte:fragment slot="trail">
		{#if $getMeQuery.data && $getMyDraftsQuery.data}
			<AuthenticatedPopup user={$getMeQuery.data} latestDraftId={$getMyDraftsQuery.data[0].id} />
		{:else}
			<AnonymousPopup />
		{/if}
	</svelte:fragment>
</AppBar>
