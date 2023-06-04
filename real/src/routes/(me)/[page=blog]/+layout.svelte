<script lang="ts">
	import BlogHeader from './_BlogHeader/BlogHeader.svelte';

	import { AppShell } from '@skeletonlabs/skeleton';
</script>

<!-- <AppShell>
	<svelte:fragment slot="header">
		<BlogHeader />
	</svelte:fragment>

	<slot />
</AppShell> -->

<BlogHeader />

<slot />
