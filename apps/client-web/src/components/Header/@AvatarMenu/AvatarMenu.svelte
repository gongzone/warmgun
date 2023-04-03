<script lang="ts">
	import { createQuery } from '@tanstack/svelte-query';

	import { getMe, getMyDrafts } from '$api/me';
	import AnonymousMenu from './AnonymousMenu/AnonymousMenu.svelte';
	import AuthenticatedMenu from './AuthenticatedMenu/AuthenticatedMenu.svelte';

	const meQuery = createQuery({
		queryKey: ['me'],
		queryFn: getMe
	});

	const myDraftsQuery = createQuery({
		queryKey: ['myDrafts'],
		queryFn: getMyDrafts
	});
</script>

{#if $meQuery.data && $myDraftsQuery.data}
	<AuthenticatedMenu user={$meQuery.data} latestDraftId={$myDraftsQuery.data[0].id} />
{:else}
	<AnonymousMenu />
{/if}
