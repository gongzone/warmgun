<script lang="ts">
	import { page } from '$app/stores';
	import { Avatar } from '@skeletonlabs/skeleton';

	import type { CurrentUser } from '$lib/types/current-user';
	import { allAvatars } from '$lib/character/avatar';

	export let width = 'w-12';
	let user: CurrentUser;

	$: user = $page.data.user;
</script>

{#if !user || !user.character}
	<i class="ri-user-line ri-lg" />
{:else}
	<Avatar {width} src={allAvatars[user.character.mainAvatar].url} />
{/if}
