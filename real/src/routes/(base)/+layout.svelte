<script lang="ts">
	import { AppShell } from '@skeletonlabs/skeleton';

	import AppHeader from './_AppHeader/AppHeader.svelte';
	import AppFooter from '$components/Footer/AppFooter.svelte';
</script>

<AppShell>
	<svelte:fragment slot="header">
		<AppHeader />
	</svelte:fragment>

	<slot />

	<svelte:fragment slot="pageFooter">
		<AppFooter />
	</svelte:fragment>
</AppShell>
