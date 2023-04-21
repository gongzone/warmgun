<script lang="ts">
	import { createQuery } from '@tanstack/svelte-query';

	import { findMe } from '$api/user';
	import { findMyDrafts } from '$api/draft';
	import AnonymousMenu from './AnonymousMenu/AnonymousMenu.svelte';
	import AuthenticatedMenu from './AuthenticatedMenu/AuthenticatedMenu.svelte';

	const meQuery = createQuery({
		queryKey: ['users', 'me'],
		queryFn: findMe
	});

	const myDraftsQuery = createQuery({
		queryKey: ['drafts', 'me'],
		queryFn: findMyDrafts
	});
</script>

{#if $meQuery.data && $myDraftsQuery.data}
	<AuthenticatedMenu user={$meQuery.data} latestDraftId={$myDraftsQuery.data[0].id} />
{:else}
	<AnonymousMenu />
{/if}
