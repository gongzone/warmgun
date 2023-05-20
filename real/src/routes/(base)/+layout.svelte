<script lang="ts">
	import { AppShell } from '@skeletonlabs/skeleton';

	import AppHeader from '$components/Header/AppHeader/AppHeader.svelte';
</script>

<AppShell>
	<svelte:fragment slot="header">
		<AppHeader />
	</svelte:fragment>

	<slot />
</AppShell>
