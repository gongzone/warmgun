<script lang="ts">
	import { createQuery } from '@tanstack/svelte-query';

	import { getMe, getMyDrafts } from '$api/me';
	import AnonymousMenu from './AnonymousMenu/AnonymousMenu.svelte';
	import AuthenticatedMenu from './AuthenticatedMenu/AuthenticatedMenu.svelte';

	const getMeQuery = createQuery({
		queryKey: ['me'],
		queryFn: getMe
	});

	const getMyDraftsQuery = createQuery({
		queryKey: ['myDrafts'],
		queryFn: getMyDrafts
	});

	$: user = $getMeQuery.data;
	$: drafts = $getMyDraftsQuery.data;
</script>

{#if user && drafts}
	<AuthenticatedMenu {user} latestDraftId={drafts[0].id} />
{:else}
	<AnonymousMenu />
{/if}
